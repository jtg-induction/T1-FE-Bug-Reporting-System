import { alpha, Box, Button, Stack, styled } from '@mui/material';

export const HeaderStack = styled(Stack)(() => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
}));

export const ListFooterContainer = styled(Box)(
    ({
        theme: {
            palette: { common },
            typography: { pxToRem },
        },
    }) => ({
        display: 'flex',
        justifyContent: 'center',
        padding: pxToRem(4),
        borderTop: `1px solid ${alpha(common.black, 0.08)}`,
        marginTop: pxToRem(2),
    }),
);

export const ViewAllButton = styled(Button)(
    ({
        theme: {
            typography: { pxToRem },
            palette: { text, primary },
        },
    }) => ({
        width: '100%',
        fontWeight: 700,
        fontSize: pxToRem(16),
        color: text.secondary,
        padding: pxToRem(2),
        '&:hover': {
            backgroundColor: alpha(primary.main, 0.04),
            color: primary.main,
        },
    }),
);
