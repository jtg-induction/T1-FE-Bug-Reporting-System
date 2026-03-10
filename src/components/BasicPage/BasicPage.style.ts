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

export const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
    gap: theme.spacing(8),
    padding: theme.spacing(16),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.grey[50],
}));

export const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.success.contrastText,
}));
