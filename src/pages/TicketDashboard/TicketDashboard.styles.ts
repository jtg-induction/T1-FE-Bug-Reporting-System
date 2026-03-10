import { Box, Link, Stack, styled, Tab } from '@mui/material';

export const StyledDashboardContainer = styled(Stack)(({ theme }) => ({
    padding: theme.spacing(4),
    gap: theme.spacing(3),
    flex: 1,
    overflowY: 'auto',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': { display: 'none' },
}));

export const StyledHeaderSection = styled(Stack)(({ theme }) => {
    const {
        spacing,
        palette,
        shape,
        typography: { pxToRem },
    } = theme;
    return {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing(2),
        border: `${pxToRem(1)} solid ${palette.divider}`,
        borderRadius: shape.borderRadius,
        backgroundColor: palette.background.paper,
    };
});

export const StyledDetailsCard = styled(Box)(({ theme }) => {
    const {
        spacing,
        palette,
        shape,
        typography: { pxToRem },
    } = theme;
    return {
        padding: spacing(4),
        border: `${pxToRem(1)} solid ${palette.divider}`,
        borderRadius: shape.borderRadius,
        backgroundColor: palette.background.paper,
    };
});

export const StyledInfoWrapper = styled(Stack)(({ theme }) => ({
    gap: theme.spacing(1.5),
    marginTop: theme.spacing(2),
}));

export const StyledInfoRow = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(1),
}));

export const StyledLabel = styled(Box)(({ theme }) => ({
    fontWeight: theme.typography.fontWeightBold,
}));

export const StyledLink = styled(Link)(({ theme }) => ({
    color: theme.palette.primary.dark,
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline',
    },
}));

export const StyledDialogContentWrapper = styled(Stack)(({ theme }) => {
    const {
        spacing,
        breakpoints,
        typography: { pxToRem },
    } = theme;
    return {
        marginTop: spacing(1),
        gap: spacing(3),
        width: '100%',
        minWidth: pxToRem(300),
        [breakpoints.up('sm')]: {
            minWidth: pxToRem(450),
        },
    };
});

export const StyledTabsWrapper = styled(Box)(({ theme }) => ({
    borderBottom: `${theme.typography.pxToRem(1)} solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
}));

export const StyledTab = styled(Tab)(({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightBold,
    minWidth: theme.typography.pxToRem(120),
    '&.Mui-selected': {
        color: theme.palette.primary.dark,
    },
}));

export const StyledTabPanel = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
    border: `${theme.typography.pxToRem(1)} solid ${theme.palette.divider}`,
    borderTop: 'none',
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
}));
