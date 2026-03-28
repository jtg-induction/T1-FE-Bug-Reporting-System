import { Stack, styled } from '@mui/material';

export const PageWrapper = styled(Stack)(
    ({
        theme: {
            typography: { pxToRem },
            breakpoints,
            spacing,
        },
    }) => ({
        minHeight: '100vh',
        padding: spacing(4, 6),
        gap: pxToRem(24),
        [breakpoints.up('md')]: {
            padding: spacing(4, 20),
        },
        [breakpoints.up('lg')]: {
            padding: spacing(4, 40),
        },
    }),
);
