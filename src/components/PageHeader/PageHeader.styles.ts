import { Stack, styled, Typography } from '@mui/material';

export const HeaderContainer = styled(Stack)(
    ({
        theme: {
            typography: { pxToRem },
            breakpoints,
        },
    }) => ({
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingBottom: pxToRem(8),
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
        },
    }) => ({
        fontWeight: 900,
        fontSize: pxToRem(24),
        [breakpoints.up('md')]: {
            fontSize: pxToRem(32),
        },
    }),
);

export const PageSubheader = styled(Typography)(
    ({
        theme: {
            typography: { pxToRem },
            breakpoints,
            palette: { text },
        },
    }) => ({
        fontSize: pxToRem(16),
        color: text.secondary,
        marginTop: 1,
        [breakpoints.up('md')]: {
            fontSize: pxToRem(20),
        },
    }),
);

export const ActionArea = styled(Stack)(
    ({
        theme: {
            typography: { pxToRem },
            breakpoints,
        },
    }) => ({
        flexDirection: 'row',
        gap: pxToRem(2),
        justifyContent: 'end',
        marginTop: pxToRem(16),
        [breakpoints.up('md')]: {
            justifyContent: 'flex-end',
            marginTop: 0,
        },
    }),
);
