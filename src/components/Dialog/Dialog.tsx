import {
    Dialog as MUIDialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

import { DialogProps } from './Dialog.types';

export const Dialog = ({
    open,
    handleClose,
    title,
    DialogContentData,
    DialogActionsContent,
}: DialogProps) => (
    <MUIDialog maxWidth={false} open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            <DialogContentText>{DialogContentData}</DialogContentText>
        </DialogContent>
        <DialogActions>{DialogActionsContent}</DialogActions>
    </MUIDialog>
);
