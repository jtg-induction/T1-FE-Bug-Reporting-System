import { Box, styled } from '@mui/material';

export const MainWrapper = styled(Box)(
    ({ theme: { breakpoints, spacing } }) => ({
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        padding: spacing(4, 4),

        [breakpoints.up('md')]: {
            padding: spacing(8, 8),
        },
    }),
);

export const ContentContainer = styled(Box)(
    ({ theme: { breakpoints, spacing } }) => ({
        width: '100%',
        padding: spacing(0, 16),

        [breakpoints.down('md')]: {
            padding: spacing(0, 3),
        },
    }),
);
