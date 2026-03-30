import { Box, ListItem, styled, Typography } from '@mui/material';

export const StyledListItem = styled(ListItem)(
    ({
        theme: {
            palette,
            shadows,
            typography: { pxToRem },
        },
    }) => ({
        display: 'flex',
        padding: 0,
        marginBottom: pxToRem(12),
        backgroundColor: palette.background.paper,
        borderRadius: pxToRem(12),
        border: `1px solid ${palette.divider}`,
        boxShadow: shadows[1],
        transition: 'all 0.2s ease-in-out',

        '&:hover': {
            borderColor: palette.primary.main,
            backgroundColor: palette.action.hover,
            transform: 'translateY(-2px)',
            boxShadow: shadows[4],
        },
    }),
);

export const ContentWrapper = styled(Box)(
    ({
        theme: {
            typography: { pxToRem },
            spacing,
        },
    }) => ({
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: spacing(4, 5),
        gap: pxToRem(16),
    }),
);

export const TextGroup = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    minWidth: 0,
});

export const TitleText = styled(Typography)(
    ({
        theme: {
            palette,
            typography: { pxToRem },
        },
    }) => ({
        fontSize: pxToRem(18),
        fontWeight: 700,
        color: palette.text.primary,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }),
);

export const SubInfoText = styled(Typography)(
    ({
        theme: {
            palette,
            typography: { pxToRem },
        },
    }) => ({
        fontSize: pxToRem(13),
        color: palette.text.secondary,
        marginTop: pxToRem(4),
        fontWeight: 400,
    }),
);

export const InfoWrapper = styled(Box)(
    ({
        theme: {
            typography: { pxToRem },
        },
    }) => ({
        display: 'flex',
        alignItems: 'center',
        gap: pxToRem(8),
        flexShrink: 0,
        maxWidth: 90,
    }),
);

export const ActionWrapper = styled(Box)(
    ({
        theme: {
            palette,
            typography: { pxToRem },
        },
    }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: pxToRem(12),
        borderLeft: `1px solid ${palette.divider}`,
        marginLeft: pxToRem(4),
        color: palette.action.active,
        transition: 'color 0.2s ease',
        cursor: 'pointer',

        '&:hover': {
            color: palette.primary.main,
        },
    }),
);
