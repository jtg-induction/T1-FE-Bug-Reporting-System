import { Alert, Button, styled } from '@mui/material';

export const StyledAlert = styled(Alert)(({ theme }) => ({
    width: '100%',
    minWidth: theme.typography.pxToRem(300),
    alignItems: 'center',
}));

export const StyledActionButton = styled(Button)(() => ({
    fontWeight: 'bold',
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
    color: '#FFD54F',
    '&:hover': {
        color: '#FFE082',
        textDecoration: 'underline',
        backgroundColor: 'rgba(255, 213, 79, 0.1)',
    },
}));
