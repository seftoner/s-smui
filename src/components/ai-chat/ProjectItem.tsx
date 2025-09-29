import React from 'react';
import {
    ListItem,
    ListItemText,
    ListItemIcon,
    ListItemButton,
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
        <ListItemButton
            key={project.id}
            component="div"
            onClick={handleClick}
        >
            <ListItemIcon>
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
        </ListItemButton>
    );
};

export default ProjectItem;