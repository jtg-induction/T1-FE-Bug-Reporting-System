import { Stack, styled, Typography } from '@mui/material';

export const MainStack = styled(Stack)(() => ({
    width: '100%',
}));

export const LoadingWrapper = styled(Stack)(
    ({
        theme: {
            typography: { pxToRem },
        },
    }) => ({
        alignItems: 'center',
        paddingTop: pxToRem(32),
        paddingBottom: pxToRem(32),
    }),
);

export const EmptyStateText = styled(Typography)(
    ({ theme: { spacing, palette } }) => ({
        textAlign: 'center',
        padding: spacing(2, 0),
        color: palette.text.secondary,
    }),
);
