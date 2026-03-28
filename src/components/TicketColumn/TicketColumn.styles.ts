import { Box, Stack, styled } from '@mui/material';

export const StyledColumnWrapper = styled(Box)(
    ({
        theme: {
            typography: { pxToRem },
            palette,
        },
    }) => ({
        minWidth: pxToRem(300),
        maxHeight: pxToRem(620),
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        gap: pxToRem(12),
        padding: pxToRem(12),
        borderRadius: 16,
        backgroundColor: palette.common.white,
    }),
);

export const StyledColumnHeader = styled(Stack)(
    ({
        theme: {
            palette,
            typography: { pxToRem },
            spacing,
        },
    }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: spacing(2, 0),
        marginBottom: pxToRem(4),
        borderBottom: `1px solid ${palette.divider}`,
    }),
);

export const StyledTicketStack = styled(Stack)(
    ({
        theme: {
            typography: { pxToRem },
        },
    }) => ({
        overflowY: 'auto',
        padding: pxToRem(8),
        gap: pxToRem(8),
        '&::-webkit-scrollbar': { width: pxToRem(4) },
    }),
);
