import { alpha, Box, Button, Stack, styled, Typography } from '@mui/material';

export const MainWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
    padding: theme.spacing(4, 2),
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(8, 4),
    },
}));

export const ContentContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    maxWidth: theme.typography.pxToRem(1000),
}));

export const HeaderContainer = styled(Stack)(({ theme }) => ({
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: theme.spacing(8),
    gap: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
}));

export const PageTitle = styled(Typography)(({ theme }) => {
    const { typography: { pxToRem } } = theme;

    return {
        fontSize: pxToRem(20),
        fontWeight: 900,
        lineHeight: 1,
        color: theme.palette.text.primary,
        [theme.breakpoints.up('md')]: {
            fontSize: theme.typography.pxToRem(32),
        }
    }

});

export const SectionLabel = styled(Typography)(({ theme }) => {
    const { typography: { pxToRem } } = theme;
    return {
        fontSize: pxToRem(16),
        fontWeight: 800,
        color: theme.palette.text.primary,
        marginBottom: theme.spacing(4),
    }

});

export const StyledSection = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4),
    backgroundColor: theme.palette.common.white,
    borderRadius: '24px',
    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    boxShadow: `0 20px 50px ${alpha(theme.palette.common.black, 0.04)}`,
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(8),
    },
}));

export const FormGridStack = styled(Stack)(({ theme }) => {
    const { typography: {pxToRem} } = theme;

    return {
        '& .MuiTextField-root': {
            width: '100%',
            '& .MuiInputLabel-root': {
                fontWeight: 700,
                fontSize: pxToRem(16),
                color: theme.palette.text.secondary,
                '&.Mui-focused': {
                    color: theme.palette.primary.main,
                },
                '&.MuiInputLabel-shrink': {
                    transform: `translate(${pxToRem(16)}, ${pxToRem(-8)}) scale(0.8)`,
                    backgroundColor: theme.palette.common.white,
                    padding: 0,
                },
            },
            '& .MuiInputBase-root': {
                borderRadius: '14px',
                minHeight: pxToRem(64),
                fontSize: pxToRem(16),
            },
            '& .MuiFilledInput-root': {
                backgroundColor: '#F3F4F6',
                '&:before, &:after': { display: 'none' },
                
                '& .MuiInputBase-input': {
                    padding: `${pxToRem(8)} ${pxToRem(16)}`,
                },
                '&.MuiInputBase-multiline': {
                    padding: `${pxToRem(0)} ${pxToRem(0)}`,
                }
            },
        }
    }
});

export const SaveButton = styled(Button)(({ theme }) => ({
    borderRadius: '14px',
    padding: theme.spacing(2, 5),
    fontWeight: 800,
    fontSize: theme.typography.pxToRem(12),
    textTransform: 'none',
    [theme.breakpoints.up('md')]: {
        fontSize: theme.typography.pxToRem(16),
    }
}));

export const ActionIconButton = styled(Button)(({ theme }) => ({
    borderRadius: '14px',
    padding: theme.spacing(2, 4),
    fontWeight: 800,
    fontSize: theme.typography.pxToRem(12),
    textTransform: 'none',
    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
    [theme.breakpoints.up('md')]: {
        fontSize: theme.typography.pxToRem(16),
    }
}));