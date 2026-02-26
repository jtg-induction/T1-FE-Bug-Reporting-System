import { Card, styled, SxProps, Theme } from '@mui/material';

export const StyledSectionCard = styled(Card)<{
    sx?: SxProps<Theme> | undefined;
}>(({ theme, sx }) => {
    const {
        shadows,
        typography: { pxToRem },
    } = theme;
    return {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: pxToRem(8),
        borderRadius: pxToRem(16),
        boxShadow: shadows[3],
        padding: theme.spacing(4),

        '& .MuiCardHeader-root': {
            padding: 0,
            height: '100%',
        },

        '& > .MuiCardContent-root': {
            padding: 0,
        },

        sx,
    };
});
