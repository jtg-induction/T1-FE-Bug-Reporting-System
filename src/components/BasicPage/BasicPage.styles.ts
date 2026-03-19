import { Box, Button, styled } from '@mui/material';

export const ImageWrapper = styled(Box)(({ theme }) => ({
    maxWidth: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '30%',

    [theme.breakpoints.up('md')]: {
        height: '70%',
        '& img': {
            height: '100%',
        },
    },
}));

export const StyledBox = styled(Box)(
    ({
        theme: {
            typography: { pxToRem },
            palette: { grey },
        },
    }) => ({
        display: 'flex',
        height: '90vh',
        flexDirection: 'column',
        gap: pxToRem(32),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: grey[50],
    }),
);

export const StyledButton = styled(Button)(
    ({
        theme: {
            palette: { success },
        },
    }) => ({
        backgroundColor: success.contrastText,
    }),
);
