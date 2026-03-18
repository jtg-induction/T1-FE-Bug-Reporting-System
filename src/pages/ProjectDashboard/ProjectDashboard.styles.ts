import { Box, Stack, styled, Tab } from '@mui/material';

export const StyledDashboardContainer = styled(Stack)(
    ({
        theme: {
            typography: { pxToRem },
        },
    }) => ({
        padding: pxToRem(32),
        gap: pxToRem(24),
        flex: 1,
        height: '100%',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
    }),
);

export const StyledTabsContainer = styled(Stack)({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
});

export const StyledTabsWrapper = styled(Box)(
    ({
        theme: {
            typography: { pxToRem },
            palette,
            shape,
        },
    }) => ({
        borderBottom: `${pxToRem(1)} solid ${palette.divider}`,
        backgroundColor: palette.background.paper,
        borderTopLeftRadius: shape.borderRadius,
        borderTopRightRadius: shape.borderRadius,
    }),
);

export const StyledTab = styled(Tab)(
    ({
        theme: {
            typography: { fontWeightBold, pxToRem },
            palette,
        },
    }) => ({
        textTransform: 'none',
        fontWeight: fontWeightBold,
        minWidth: pxToRem(120),
        '&.Mui-selected': {
            color: palette.primary.dark,
        },
    }),
);

export const StyledTabPanel = styled(Box)(
    ({
        theme: {
            typography: { pxToRem },
            palette,
            shape,
            breakpoints,
        },
    }) => ({
        padding: pxToRem(8),

        [breakpoints.up('sm')]: {
            padding: pxToRem(16),
        },

        [breakpoints.up('md')]: {
            padding: pxToRem(24),
        },

        backgroundColor: palette.background.paper,
        border: `${pxToRem(1)} solid ${palette.divider}`,
        borderTop: 'none',
        borderBottomLeftRadius: shape.borderRadius,
        borderBottomRightRadius: shape.borderRadius,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    }),
);
