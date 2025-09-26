import React, { useState } from 'react';
import {
    Box,
    Typography,
    Fab,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Avatar,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
} from '@mui/material';
import {
    Plus,
    File,
    FilePdf,
    Image,
    FileText,
    Download,
    Trash,
    Eye,
} from '@phosphor-icons/react';
import { AppCard, EmptyState } from '../../components';
import type { Document } from '../../types';

// Mock documents data
const mockDocuments: Document[] = [
    {
        id: '1',
        name: 'Project Requirements.pdf',
        type: 'pdf',
        size: 2048000,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
        description: 'Detailed project requirements and specifications',
    },
    {
        id: '2',
        name: 'Design Mockups.png',
        type: 'image',
        size: 5120000,
        createdAt: new Date('2024-01-18'),
        updatedAt: new Date('2024-01-18'),
        description: 'UI/UX mockups for the application',
    },
    {
        id: '3',
        name: 'Meeting Notes.txt',
        type: 'txt',
        size: 15360,
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-22'),
        description: 'Weekly team meeting notes and action items',
    },
];

const getDocumentIcon = (type: Document['type']) => {
    switch (type) {
        case 'pdf':
            return <FilePdf color="#e53e3e" />;
        case 'image':
            return <Image color="#38a169" />;
        case 'txt':
            return <FileText color="#3182ce" />;
        case 'doc':
            return <File color="#3182ce" />;
        default:
            return <File />;
    }
};

const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const DocumentsApp: React.FC = () => {
    const [documents, setDocuments] = useState<Document[]>(mockDocuments);
    const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
    const [uploadForm, setUploadForm] = useState({
        name: '',
        description: '',
    });

    const handleUpload = () => {
        if (!uploadForm.name.trim()) return;

        const newDoc: Document = {
            id: Date.now().toString(),
            name: uploadForm.name,
            type: 'other',
            size: Math.floor(Math.random() * 1000000), // Random size for demo
            createdAt: new Date(),
            updatedAt: new Date(),
            description: uploadForm.description,
        };

        setDocuments(prev => [...prev, newDoc]);
        setUploadForm({ name: '', description: '' });
        setIsUploadDialogOpen(false);
    };

    const handleDelete = (documentId: string) => {
        setDocuments(prev => prev.filter(doc => doc.id !== documentId));
    };

    const groupedDocuments = documents.reduce((groups, doc) => {
        const type = doc.type;
        if (!groups[type]) {
            groups[type] = [];
        }
        groups[type].push(doc);
        return groups;
    }, {} as Record<Document['type'], Document[]>);

    const getTypeLabel = (type: Document['type']) => {
        switch (type) {
            case 'pdf':
                return 'PDF Documents';
            case 'image':
                return 'Images';
            case 'txt':
                return 'Text Files';
            case 'doc':
                return 'Documents';
            default:
                return 'Other Files';
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4">Documents</Typography>
                <Fab color="primary" aria-label="add" onClick={() => setIsUploadDialogOpen(true)}>
                    <Plus />
                </Fab>
            </Box>

            <Box sx={{ mb: 3 }}>
                <AppCard title="Document Library" description="Manage and organize your files">
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <Chip label={`${documents.length} files`} variant="outlined" />
                        <Chip
                            label={`${formatFileSize(documents.reduce((total, doc) => total + doc.size, 0))} total`}
                            variant="outlined"
                        />
                    </Box>
                </AppCard>
            </Box>

            {documents.length === 0 ? (
                <EmptyState
                    icon={<File size={64} />}
                    title="No documents"
                    description="Upload your first document to get started"
                    action={{
                        label: 'Upload Document',
                        onClick: () => setIsUploadDialogOpen(true),
                    }}
                />
            ) : (
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
                    {Object.entries(groupedDocuments).map(([type, docs]) => (
                        <Box key={type}>
                            <AppCard title={`${getTypeLabel(type as Document['type'])} (${docs.length})`}>
                                <List>
                                    {docs.map((document) => (
                                        <ListItem key={document.id}>
                                            <ListItemIcon>
                                                <Avatar sx={{ bgcolor: 'transparent' }}>
                                                    {getDocumentIcon(document.type)}
                                                </Avatar>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={document.name}
                                                secondary={
                                                    <Box>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {formatFileSize(document.size)} • {document.createdAt.toLocaleDateString()}
                                                        </Typography>
                                                        {document.description && (
                                                            <Typography variant="body2" color="text.secondary">
                                                                {document.description}
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                }
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton size="small" sx={{ mr: 1 }}>
                                                    <Eye />
                                                </IconButton>
                                                <IconButton size="small" sx={{ mr: 1 }}>
                                                    <Download />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    color="error"
                                                    onClick={() => handleDelete(document.id)}
                                                >
                                                    <Trash />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))}
                                </List>
                            </AppCard>
                        </Box>
                    ))}
                </Box>
            )}

            {/* Upload Dialog */}
            <Dialog open={isUploadDialogOpen} onClose={() => setIsUploadDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Upload Document</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="File Name"
                        fullWidth
                        variant="outlined"
                        value={uploadForm.name}
                        onChange={(e) => setUploadForm(prev => ({ ...prev, name: e.target.value }))}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label="Description (Optional)"
                        fullWidth
                        multiline
                        rows={3}
                        variant="outlined"
                        value={uploadForm.description}
                        onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                        sx={{ mb: 2 }}
                    />
                    <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                        <Button onClick={() => setIsUploadDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleUpload} variant="contained" disabled={!uploadForm.name.trim()}>
                            Upload
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default DocumentsApp;