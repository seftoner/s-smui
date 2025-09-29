import React from 'react';
import {
    ListItemText,
    ListItemIcon,
    ListItemButton,
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
        <ListItemButton
            component="div"
            onClick={onClick}
        >
            <ListItemIcon>
                <FolderPlusIcon size={24} weight="regular" />
            </ListItemIcon>
            <ListItemText
                primary="New Project"
                sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                }}
            />
        </ListItemButton>
    );
};

export default NewProjectButton;