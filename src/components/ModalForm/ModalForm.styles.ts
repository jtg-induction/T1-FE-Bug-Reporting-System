import {
    DialogActions,
    DialogContent,
    DialogTitle,
    styled,
} from '@mui/material';

export const StyledDialogTitle = styled(DialogTitle)(
    ({
        theme: {
            typography: { pxToRem, h2 },
        },
    }) => ({
        paddingTop: pxToRem(8),
        fontSize: h2.fontSize,
        fontWeight: h2.fontWeight,
    }),
);

export const StyledDialogContent = styled(DialogContent)(
    ({
        theme: {
            typography: { pxToRem },
        },
    }) => ({
        paddingBottom: pxToRem(8),
    }),
);

export const StyledDialogActions = styled(DialogActions)(
    ({
        theme: {
            typography: { pxToRem },
            spacing,
        },
    }) => ({
        padding: spacing(0, 3, 3),
        gap: pxToRem(4),
    }),
);
