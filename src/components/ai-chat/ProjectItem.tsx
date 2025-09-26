import React from 'react';
import {
    ListItem,
    ListItemText,
    ListItemIcon,
} from '@mui/material';
import {
    FolderIcon,
    FolderOpenIcon,
} from '@phosphor-icons/react';

interface Project {
    id: number;
    name: string;
    isOpen: boolean;
}

interface ProjectItemProps {
    project: Project;
    onClick?: (project: Project) => void;
}

export const ProjectItem: React.FC<ProjectItemProps> = ({
    project,
    onClick,
}) => {
    const handleClick = () => {
        if (onClick) {
            onClick(project);
        }
    };

    return (
        <ListItem
            key={project.id}
            component="div"
            onClick={handleClick}
            sx={{
                cursor: 'pointer',
                borderRadius: 2,
            }}
        >
            <ListItemIcon sx={{ minWidth: 32, color: 'text.primary' }}>
                {project.isOpen ? (
                    <FolderOpenIcon size={24} weight="regular" />
                ) : (
                    <FolderIcon size={24} weight="regular" />
                )}
            </ListItemIcon>
            <ListItemText
                primary={project.name}
                sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                }}
            />
        </ListItem>
    );
};

export default ProjectItem;