import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from '@mui/material';

interface RenameChatDialogProps {
    open: boolean;
    newTitle: string;
    onTitleChange: (newTitle: string) => void;
    onConfirm: () => void;
    onCancel: () => void;
}

export const RenameChatDialog: React.FC<RenameChatDialogProps> = ({
    open,
    newTitle,
    onTitleChange,
    onConfirm,
    onCancel,
}) => {
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && newTitle.trim()) {
            onConfirm();
        }
    };

    return (
        <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
            <DialogTitle>Rename Chat</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Chat Title"
                    fullWidth
                    variant="outlined"
                    value={newTitle}
                    onChange={(e) => onTitleChange(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>Cancel</Button>
                <Button
                    onClick={onConfirm}
                    variant="contained"
                    disabled={!newTitle.trim()}
                >
                    Rename
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RenameChatDialog;