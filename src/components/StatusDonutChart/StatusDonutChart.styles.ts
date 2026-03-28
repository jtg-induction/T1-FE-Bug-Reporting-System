import { Box, styled } from '@mui/material';

export const ChartContainer = styled(Box)(
    ({
        theme: {
            typography: { pxToRem },
        },
    }) => ({
        width: '100%',
        height: pxToRem(320),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }),
);
