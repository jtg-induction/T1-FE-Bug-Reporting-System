import { MarkEmailRead } from '@mui/icons-material';
import { Stack, styled, Typography } from '@mui/material';

export const SuccessContainer = styled(Stack)({
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    minHeight: '100vh',
});

export const SuccessIcon = styled(MarkEmailRead)(
    ({
        theme: {
            palette,
            typography: { pxToRem },
        },
    }) => ({
        fontSize: pxToRem(60),
        color: palette.success.main,
        marginBottom: pxToRem(16),
    }),
);
export const SpamWarningText = styled(Typography)(
    ({
        theme: {
            palette,
            typography: { pxToRem },
        },
    }) => ({
        color: palette.text.disabled,
        marginBottom: pxToRem(32),
    }),
);
