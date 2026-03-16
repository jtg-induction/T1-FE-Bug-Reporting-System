import { Link } from 'react-router-dom';

import { Box, Stack, styled } from '@mui/material';

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
        padding: `${pxToRem(8)}`,
        backgroundColor: palette.background.paper,
        borderBottom: `1px solid ${palette.divider}`,
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
        '& .description-text': {
            lineHeight: 1.6,
            color: palette.text.secondary,
        },
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
        },
    }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        padding: `${pxToRem(10)} ${pxToRem(16)}`,
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
