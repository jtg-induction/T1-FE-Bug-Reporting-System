import { Box, Paper, Stack, styled, Typography } from '@mui/material';

export const MainLayout = styled(Stack)(
    ({
        theme: {
            typography: { pxToRem },
        },
    }) => ({
        width: '100%',
        gap: pxToRem(24),
    }),
);
export const TitleWrapper = styled(Stack)(({ theme: { breakpoints } }) => ({
    maxWidth: '50%',
    [breakpoints.up('md')]: {
        maxWidth: '70%',
    },
}));
export const TicketContentCard = styled(Paper)(
    ({
        theme: {
            typography: { pxToRem },
            palette,
            breakpoints,
        },
    }) => ({
        padding: pxToRem(24),
        borderRadius: 8,
        border: `1px solid ${palette.divider}`,
        display: 'flex',
        flexDirection: 'column',
        gap: pxToRem(24),
        [breakpoints.down('md')]: {
            padding: pxToRem(16),
        },
    }),
);

export const FlexHeader = styled(Box)(
    ({
        theme: {
            typography: { pxToRem },
        },
    }) => ({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: pxToRem(16),
    }),
);

export const TruncatedTitle = styled(Typography)(
    ({
        theme: {
            typography: { pxToRem },
            breakpoints,
        },
    }) => ({
        fontSize: pxToRem(24),
        fontWeight: 800,
        [breakpoints.up('md')]: {
            fontSize: pxToRem(36),
        },
        maxWidth: '100%',
    }),
);

export const MetadataStack = styled(Stack)(
    ({
        theme: {
            typography: { pxToRem },
            breakpoints,
        },
    }) => ({
        flexDirection: 'row',
        flexWrap: 'wrap',
        [breakpoints.down('md')]: {
            flexDirection: 'column',
            flexWrap: 'nowrap',
        },
        gap: pxToRem(20),
        alignItems: 'start',
    }),
);

export const MetaItem = styled(Stack)(
    ({
        theme: {
            typography: { pxToRem },
            palette: { grey },
        },
    }) => ({
        gap: pxToRem(4),
        minWidth: 0,
        maxWidth: 160,
        '& .label': {
            textTransform: 'uppercase',
            fontSize: pxToRem(12),
            fontWeight: 700,
            color: grey[600],
        },
    }),
);

export const UserInfo = styled(Stack)(
    ({
        theme: {
            typography: { pxToRem },
        },
    }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: pxToRem(4),
    }),
);

export const BodyText = styled(Typography, {
    shouldForwardProp: (prop) => prop !== 'isExpanded',
})<{ isExpanded: boolean }>(
    ({
        isExpanded,
        theme: {
            mixins: { lineClamp },
            palette,
        },
    }) => ({
        color: palette.text.secondary,
        ...(!isExpanded ? lineClamp(1) : {}),
    }),
);

export const CommentSection = styled(Stack)(
    ({
        theme: {
            typography: { pxToRem },
        },
    }) => ({
        padding: `0 ${pxToRem(4)}`,
        gap: pxToRem(8),
    }),
);

export const ActivityPlaceholder = styled(Box)(
    ({
        theme: {
            typography: { pxToRem },
            palette,
        },
    }) => ({
        height: pxToRem(100),
        border: `2px dashed ${palette.divider}`,
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: palette.text.disabled,
    }),
);
