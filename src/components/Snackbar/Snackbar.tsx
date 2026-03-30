import { Link } from 'react-router-dom';

import { Snackbar } from '@mui/material';

import { StyledActionButton, StyledAlert } from './Snackbar.styles';
import { CustomSnackbarProps } from './Snackbar.types';

export const CustomSnackbar = ({
    open,
    message,
    severity = 'success',
    onClose,
    autoHideDuration = 4000,
    anchorOrigin = { vertical: 'bottom', horizontal: 'center' },
    actionLabel,
    actionUrl,
}: CustomSnackbarProps) => (
    <Snackbar
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={onClose}
        anchorOrigin={anchorOrigin}
    >
        <StyledAlert
            onClose={onClose}
            severity={severity}
            variant="filled"
            action={
                actionLabel && actionUrl ? (
                    <StyledActionButton
                        size="small"
                        component={Link}
                        to={actionUrl}
                        onClick={onClose}
                    >
                        {actionLabel}
                    </StyledActionButton>
                ) : undefined
            }
        >
            {message}
        </StyledAlert>
    </Snackbar>
);
