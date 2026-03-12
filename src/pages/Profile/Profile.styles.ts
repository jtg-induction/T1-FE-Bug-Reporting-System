import { Stack, styled } from '@mui/material';

export const StyledStack = styled(Stack)(({ theme }) => {
    const {
        typography: { pxToRem },
        breakpoints,
    } = theme;

    return {
        padding: `0 ${pxToRem(128)}`,

        [breakpoints.down('md')]: {
            padding: `0 ${pxToRem(12)}`,
        },
    };
});
