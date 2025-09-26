import React, { useState } from 'react';
import {
    Box,
    Typography,
    Fab,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Chip,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    IconButton,
} from '@mui/material';
import { Plus, CheckCircle, Circle, DotsThreeVertical } from '@phosphor-icons/react';
import { AppCard, EmptyState } from '../../components';
import type { Task } from '../../types';

// Mock tasks data
const mockTasks: Task[] = [
    {
        id: '1',
        title: 'Implement user authentication',
        description: 'Add OAuth integration and user session management',
        status: 'in-progress',
        priority: 'high',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-20'),
        dueDate: new Date('2024-02-01'),
    },
    {
        id: '2',
        title: 'Design landing page',
        description: 'Create wireframes and mockups for the new landing page',
        status: 'completed',
        priority: 'medium',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-18'),
    },
    {
        id: '3',
        title: 'Set up CI/CD pipeline',
        description: 'Configure automated testing and deployment',
        status: 'todo',
        priority: 'high',
        createdAt: new Date('2024-01-22'),
        updatedAt: new Date('2024-01-22'),
        dueDate: new Date('2024-02-15'),
    },
];

const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
        case 'high':
            return 'error';
        case 'medium':
            return 'warning';
        case 'low':
            return 'info';
        default:
            return 'default';
    }
};

export const TaskManagementApp: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>(mockTasks);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        priority: 'medium' as Task['priority'],
        dueDate: '',
    });

    const tasksByStatus = {
        todo: tasks.filter(task => task.status === 'todo'),
        'in-progress': tasks.filter(task => task.status === 'in-progress'),
        completed: tasks.filter(task => task.status === 'completed'),
    };

    const handleCreateTask = () => {
        if (!newTask.title.trim()) return;

        const task: Task = {
            id: Date.now().toString(),
            title: newTask.title,
            description: newTask.description,
            status: 'todo',
            priority: newTask.priority,
            createdAt: new Date(),
            updatedAt: new Date(),
            dueDate: newTask.dueDate ? new Date(newTask.dueDate) : undefined,
        };

        setTasks(prev => [...prev, task]);
        setNewTask({ title: '', description: '', priority: 'medium', dueDate: '' });
        setIsDialogOpen(false);
    };

    const toggleTaskStatus = (taskId: string) => {
        setTasks(prev => prev.map(task => {
            if (task.id === taskId) {
                const newStatus = task.status === 'completed' ? 'todo' :
                    task.status === 'todo' ? 'in-progress' : 'completed';
                return { ...task, status: newStatus, updatedAt: new Date() };
            }
            return task;
        }));
    };

    const TaskColumn: React.FC<{ title: string; tasks: Task[] }> = ({
        title,
        tasks: columnTasks,
    }) => (
        <AppCard title={`${title} (${columnTasks.length})`}>
            {columnTasks.length === 0 ? (
                <EmptyState
                    icon={<CheckCircle size={48} />}
                    title="No tasks"
                    description={`No tasks in ${title.toLowerCase()}`}
                />
            ) : (
                <List>
                    {columnTasks.map((task) => (
                        <ListItem key={task.id} sx={{ px: 0 }}>
                            <ListItemIcon>
                                <IconButton onClick={() => toggleTaskStatus(task.id)}>
                                    {task.status === 'completed' ? <CheckCircle color="green" /> : <Circle />}
                                </IconButton>
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                                        <Typography variant="subtitle1">{task.title}</Typography>
                                        <Chip
                                            label={task.priority}
                                            size="small"
                                            color={getPriorityColor(task.priority) as any}
                                            variant="outlined"
                                        />
                                    </Box>
                                }
                                secondary={
                                    <Box>
                                        {task.description && (
                                            <Typography variant="body2" color="text.secondary" paragraph>
                                                {task.description}
                                            </Typography>
                                        )}
                                        {task.dueDate && (
                                            <Typography variant="caption" color="text.secondary">
                                                Due: {task.dueDate.toLocaleDateString()}
                                            </Typography>
                                        )}
                                    </Box>
                                }
                            />
                            <IconButton size="small">
                                <DotsThreeVertical />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            )}
        </AppCard>
    );

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4">Task Management</Typography>
                <Fab color="primary" aria-label="add" onClick={() => setIsDialogOpen(true)}>
                    <Plus />
                </Fab>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
                <Box>
                    <TaskColumn title="To Do" tasks={tasksByStatus.todo} />
                </Box>
                <Box>
                    <TaskColumn title="In Progress" tasks={tasksByStatus['in-progress']} />
                </Box>
                <Box>
                    <TaskColumn title="Completed" tasks={tasksByStatus.completed} />
                </Box>
            </Box>

            {/* Create Task Dialog */}
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Task Title"
                        fullWidth
                        variant="outlined"
                        value={newTask.title}
                        onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        multiline
                        rows={3}
                        variant="outlined"
                        value={newTask.description}
                        onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                        sx={{ mb: 2 }}
                    />
                    <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
                        <InputLabel>Priority</InputLabel>
                        <Select
                            value={newTask.priority}
                            label="Priority"
                            onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value as Task['priority'] }))}
                        >
                            <MenuItem value="low">Low</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="high">High</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        label="Due Date"
                        type="date"
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleCreateTask} variant="contained" disabled={!newTask.title.trim()}>
                        Create Task
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default TaskManagementApp;