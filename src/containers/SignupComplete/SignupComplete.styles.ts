import { ErrorOutline } from '@mui/icons-material';
import { Box, Button, styled } from '@mui/material';

export const CenteredContainer = styled(Box)(
    ({
        theme: {
            typography: { pxToRem },
        },
    }) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: pxToRem(32),
    }),
);

export const InvalidLinkContainer = styled(CenteredContainer)(
    ({
        theme: {
            typography: { pxToRem },
        },
    }) => ({
        textAlign: 'center',
        maxWidth: pxToRem(400),
        margin: '0 auto',
    }),
);

export const InvalidIcon = styled(ErrorOutline)(
    ({
        theme: {
            palette,
            typography: { pxToRem },
        },
    }) => ({
        fontSize: pxToRem(60),
        color: palette.error.main,
        marginBottom: pxToRem(16),
    }),
);

export const ActionButton = styled(Button)(
    ({
        theme: {
            typography: { pxToRem },
        },
    }) => ({
        marginTop: pxToRem(24),
    }),
);
