import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StatsContainer = styled(Box)(
    ({
        theme: {
            palette,
            typography: { pxToRem },
        },
    }) => ({
        display: 'flex',
        alignItems: 'center',
        border: `1px solid ${palette.divider}`,
        borderRadius: pxToRem(8),
        padding: pxToRem(16),
        backgroundColor: palette.background.paper,
    }),
);

export const IconWrapper = styled(Box)(
    ({
        theme: {
            palette,
            typography: { pxToRem },
        },
    }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: pxToRem(48),
        height: pxToRem(48),
        borderRadius: pxToRem(8),
        backgroundColor: palette.grey[100],
        marginRight: pxToRem(16),
        color: palette.text.secondary,
    }),
);

export const TextContainer = styled(Box)(
    ({
        theme: {
            typography: { pxToRem },
        },
    }) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: pxToRem(2),
    }),
);

export const TitleText = styled(Typography)(({ theme: { palette } }) => ({
    fontWeight: 600,
    color: palette.text.primary,
}));

export const SubtitleText = styled(Typography)(({ theme: { palette } }) => ({
    color: palette.text.secondary,
}));
