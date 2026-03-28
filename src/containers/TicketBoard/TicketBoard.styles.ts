import { alpha, Stack, styled } from '@mui/material';

export const StyledBoardContainer = styled(Stack)(
    ({
        theme: {
            typography: { pxToRem },
            palette,
        },
    }) => ({
        flexDirection: 'row',
        gap: pxToRem(16),
        height: 'max-content',
        width: '100%',
        overflowX: 'auto',
        padding: pxToRem(12),
        backgroundColor: alpha(palette.primary.main, 0.1),
        alignItems: 'flex-start',
    }),
);
