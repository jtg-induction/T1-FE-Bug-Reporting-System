import { Stack, styled } from '@mui/material';

export const FilterContainer = styled(Stack)(
    ({
        theme: {
            typography: { pxToRem },
            breakpoints,
        },
    }) => ({
        flexDirection: 'column',
        gap: pxToRem(16),
        marginTop: pxToRem(8),
        [breakpoints.up('md')]: {
            flexDirection: 'row',
        },
    }),
);
