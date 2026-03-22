import {
    DialogActions,
    DialogContent,
    DialogTitle,
    styled,
} from '@mui/material';
import { dialogContentClasses } from '@mui/material/DialogContent';

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
    ({ theme: { spacing } }) => ({
        [`&.${dialogContentClasses.root}`]: {
            padding: spacing(2, 6, 4),
        },
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
