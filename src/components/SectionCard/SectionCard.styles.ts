import { Card, styled } from '@mui/material';
import { cardContentClasses } from '@mui/material/CardContent';
import { cardHeaderClasses } from '@mui/material/CardHeader';

export const StyledSectionCard = styled(Card)(({ theme }) => {
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

        [`& .${cardHeaderClasses.root}`]: {
            padding: 0,
            height: '100%',
        },

        [`& > .${cardContentClasses.root}`]: {
            padding: 0,
        },
    };
});
