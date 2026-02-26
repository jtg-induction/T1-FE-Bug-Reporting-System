import { Button, Stack, styled } from '@mui/material';

export const StyledFormComponent = styled(Stack)(
    ({
        theme: {
            shape,
            typography: { pxToRem },
        },
    }) => ({
        minWidth: '50%',
        height: 'auto',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, .8)',
        borderRadius: pxToRem(shape.borderRadius * 4),
        boxShadow: `0 ${pxToRem(4)} ${pxToRem(20)} rgba(0, 0, 0, 0.2)`,
        padding: pxToRem(20),
        gap: pxToRem(20),
    }),
);

export const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.success.contrastText,
}));
