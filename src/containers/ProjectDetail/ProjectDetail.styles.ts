import { Link } from 'react-router-dom';

import { Box, Button, Stack, styled, Typography } from '@mui/material';

export const StyledHeaderSection = styled(Stack)(
    ({
        theme: {
            typography: { pxToRem },
            palette,
        },
    }) => ({
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: pxToRem(8),
        backgroundColor: palette.background.paper,
        borderBottom: `1px solid ${palette.divider}`,
    }),
);
export const TitleWrapper = styled(Stack)(
    ({
        theme: {
            typography: { pxToRem },
        },
    }) => ({
        maxWidth: '70%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: pxToRem(16),
        gap: pxToRem(4),
    }),
);
export const StyledDetailsCard = styled(Box)(
    ({
        theme: {
            typography: { pxToRem },
            palette,
            shape,
        },
    }) => ({
        padding: pxToRem(8),
        borderRadius: shape.borderRadius,
        backgroundColor: palette.background.paper,
    }),
);

export const StyledDescriptionWrapper = styled(Box)(
    ({
        theme: {
            typography: { pxToRem },
        },
    }) => ({
        marginBottom: pxToRem(24),
    }),
);
export const StyledDescriptionText = styled(Typography, {
    shouldForwardProp: (prop) => prop !== 'isExpanded',
})<{ isExpanded: boolean }>(
    ({
        isExpanded,
        theme: {
            palette,
            mixins: { lineClamp },
        },
    }) => ({
        lineHeight: 1.6,
        color: palette.text.secondary,
        ...(!isExpanded ? lineClamp(3) : {}),
    }),
);

export const StyledShowMoreButton = styled(Button)(
    ({
        theme: {
            typography: { pxToRem },
        },
    }) => ({
        marginTop: pxToRem(4),
        minWidth: 'auto',
        textTransform: 'none',
    }),
);

export const StyledInfoWrapper = styled(Stack)(
    ({
        theme: {
            typography: { pxToRem },
        },
    }) => ({
        gap: pxToRem(12),
    }),
);

export const StyledInfoRow = styled(Stack)(
    ({
        theme: {
            typography: { pxToRem },
            palette,
            shape,
            spacing,
        },
    }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing(2, 4),
        backgroundColor: palette.action.hover,
        borderRadius: shape.borderRadius,
        gap: pxToRem(16),
        overflow: 'hidden',
    }),
);

export const StyledLabel = styled(Box)(
    ({
        theme: {
            typography: { fontWeightBold, pxToRem },
            palette,
        },
    }) => ({
        fontWeight: fontWeightBold,
        color: palette.text.secondary,
        textTransform: 'uppercase',
        letterSpacing: pxToRem(0.5),
        minWidth: pxToRem(80),
        flexShrink: 0,
    }),
);

export const StyledLink = styled(Link)(({ theme: { palette } }) => ({
    color: palette.primary.main,
    textDecoration: 'none',
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    '&:hover': {
        color: palette.primary.dark,
        textDecoration: 'underline',
    },
}));

export const StyledDialogContentWrapper = styled(Stack)(
    ({
        theme: {
            breakpoints,
            typography: { pxToRem },
        },
    }) => ({
        marginTop: pxToRem(8),
        gap: pxToRem(24),
        width: '100%',
        minWidth: pxToRem(300),
        [breakpoints.up('sm')]: {
            minWidth: pxToRem(450),
        },
    }),
);
