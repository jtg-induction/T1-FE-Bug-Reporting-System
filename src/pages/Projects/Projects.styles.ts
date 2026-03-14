import { Stack, styled } from '@mui/material';

export const StyledStack = styled(Stack)(
    ({
        theme: {
            typography: { pxToRem },
            breakpoints,
        },
    }) => ({
        padding: `${pxToRem(16)} ${pxToRem(160)}`,
        gap: pxToRem(24),
        [breakpoints.down('md')]: {
            padding: `${pxToRem(16)} ${pxToRem(24)} 0`,
        },
    }),
);
