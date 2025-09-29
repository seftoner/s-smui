import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    DialogContentText,
} from '@mui/material';

interface DeleteChatDialogProps {
    open: boolean;
    chatTitle: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export const DeleteChatDialog: React.FC<DeleteChatDialogProps> = ({
    open,
    chatTitle,
    onConfirm,
    onCancel,
}) => {
    return (
        <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
            <DialogTitle>Delete Chat</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete "{chatTitle}"? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>Cancel</Button>
                <Button
                    onClick={onConfirm}
                    variant="contained"
                    color="error"
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteChatDialog;