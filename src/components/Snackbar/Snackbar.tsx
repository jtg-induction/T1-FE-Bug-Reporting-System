import { Alert, Snackbar } from '@mui/material';

import { CustomSnackbarProps } from './Snackbar.types';

export const CustomSnackbar = ({
    open,
    message,
    severity = 'success',
    onClose,
    autoHideDuration = 4000,
    anchorOrigin = { vertical: 'bottom', horizontal: 'center' },
}: CustomSnackbarProps) => (
    <Snackbar
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={onClose}
        anchorOrigin={anchorOrigin}
    >
        <Alert
            onClose={onClose}
            severity={severity}
            variant="filled"
            sx={(theme) => ({
                width: '100%',
                minWidth: theme.typography.pxToRem(300),
            })}
        >
            {message}
        </Alert>
    </Snackbar>
);
