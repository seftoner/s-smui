import React from 'react';
import {
    ListItem,
    ListItemText,
    ListItemIcon,
} from '@mui/material';
import {
    FolderPlusIcon,
} from '@phosphor-icons/react';

interface NewProjectButtonProps {
    onClick?: () => void;
}

export const NewProjectButton: React.FC<NewProjectButtonProps> = ({
    onClick,
}) => {
    return (
        <ListItem
            component="div"
            onClick={onClick}
            sx={{
                cursor: 'pointer',
                borderRadius: 2,
            }}
        >
            <ListItemIcon sx={{ minWidth: 32, color: 'text.primary' }}>
                <FolderPlusIcon size={24} weight="regular" />
            </ListItemIcon>
            <ListItemText
                primary="New Project"
                sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                }}
            />
        </ListItem>
    );
};

export default NewProjectButton;