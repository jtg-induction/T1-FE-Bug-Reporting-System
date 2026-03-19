import { Stack, styled } from '@mui/material';

export const PageWrapper = styled(Stack)(
    ({
        theme: {
            typography: { pxToRem },
            breakpoints,
        },
    }) => ({
        minHeight: '100vh',
        padding: `${pxToRem(16)} ${pxToRem(24)}`,
        gap: pxToRem(24),
        [breakpoints.up('md')]: {
            padding: `${pxToRem(16)} ${pxToRem(160)}`,
        },
    }),
);
