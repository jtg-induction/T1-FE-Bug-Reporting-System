import { Box, styled } from '@mui/material';

export const MainWrapper = styled(Box)(
    ({
        theme: {
            typography: { pxToRem },
            breakpoints,
        },
    }) => ({
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        padding: `${pxToRem(16)} ${pxToRem(16)}`,

        [breakpoints.up('md')]: {
            padding: `${pxToRem(32)} ${pxToRem(32)}`,
        },
    }),
);

export const ContentContainer = styled(Box)(
    ({
        theme: {
            typography: { pxToRem },
            breakpoints,
        },
    }) => ({
        width: '100%',
        padding: `0 ${pxToRem(128)}`,

        [breakpoints.down('md')]: {
            padding: `0 ${pxToRem(12)}`,
        },
    }),
);
