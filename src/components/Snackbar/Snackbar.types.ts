import { AlertColor, SnackbarProps } from '@mui/material';

export interface CustomSnackbarProps {
    open: boolean;
    message: string;
    severity?: AlertColor;
    onClose: () => void;
    autoHideDuration?: number;
    anchorOrigin?: SnackbarProps['anchorOrigin'];
    actionLabel?: string;
    actionUrl?: string;
}
