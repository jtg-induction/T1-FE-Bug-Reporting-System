import { alpha, Button, Stack, styled, Typography } from '@mui/material';

export const HeaderContainer = styled(Stack)(
    ({
        theme: {
            typography: { pxToRem },
            breakpoints,
        },
    }) => ({
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: pxToRem(32),
        [breakpoints.up('md')]: {
            flexDirection: 'row',
            alignItems: 'flex-start',
        },
    }),
);

export const PageTitle = styled(Typography)(
    ({
        theme: {
            typography: { pxToRem },
            breakpoints,
            palette: { text },
        },
    }) => ({
        fontSize: pxToRem(20),
        fontWeight: 900,
        lineHeight: 1,
        color: text.primary,
        [breakpoints.up('md')]: {
            fontSize: pxToRem(32),
        },
    }),
);

export const SaveButton = styled(Button)(
    ({
        theme: {
            typography: { pxToRem },
            breakpoints,
            spacing,
        },
    }) => ({
        borderRadius: 16,
        padding: spacing(2, 4),
        fontWeight: 800,
        fontSize: pxToRem(12),
        textTransform: 'none',
        [breakpoints.up('md')]: {
            fontSize: pxToRem(16),
        },
    }),
);

export const ActionIconButton = styled(Button)(
    ({
        theme: {
            typography: { pxToRem },
            palette: { divider, common, text },
            breakpoints,
            spacing,
        },
    }) => ({
        borderRadius: 16,
        padding: spacing(2, 4),
        fontWeight: 800,
        fontSize: pxToRem(12),
        textTransform: 'none',
        border: `1px solid ${alpha(divider, 0.2)}`,
        backgroundColor: common.white,
        color: text.primary,
        [breakpoints.up('md')]: {
            fontSize: pxToRem(16),
        },
    }),
);
