import { Stack, styled } from '@mui/material';

export const StyledStack = styled(Stack)(
    ({
        theme: {
            typography: { pxToRem },
            breakpoints,
            spacing,
        },
    }) => ({
        padding: spacing(4, 40),
        gap: pxToRem(24),
        [breakpoints.down('md')]: {
            padding: spacing(4, 6, 0),
        },
    }),
);
