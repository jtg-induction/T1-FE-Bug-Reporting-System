import { alpha, Box, Paper, styled, Typography } from '@mui/material';

export const StyledTicketCard = styled(Paper)(
    ({
        theme: {
            palette,
            typography: { pxToRem },
            boxShadow,
        },
    }) => ({
        display: 'flex',
        flexDirection: 'column',
        padding: pxToRem(16),
        borderRadius: pxToRem(8),
        border: `1px solid ${palette.divider}`,
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        width: '100%',
        minWidth: 0,

        '&:hover': {
            borderColor: palette.primary.main,
            backgroundColor: alpha(palette.primary.main, 0.1),
            boxShadow: boxShadow.tertiary,
        },
    }),
);

export const TopRow = styled(Box)(
    ({
        theme: {
            typography: { pxToRem },
        },
    }) => ({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: pxToRem(8),
        gap: pxToRem(12),
    }),
);

export const TitleText = styled(Typography)(
    ({
        theme: {
            palette,
            typography: { pxToRem },
        },
    }) => ({
        fontSize: pxToRem(16),
        fontWeight: 600,
        color: palette.text.primary,
        marginBottom: pxToRem(12),
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        wordBreak: 'break-word',
    }),
);

export const TagRow = styled(Box)(
    ({
        theme: {
            typography: { pxToRem },
        },
    }) => ({
        display: 'flex',
        flexWrap: 'wrap',
        gap: pxToRem(8),
        marginBottom: pxToRem(16),
    }),
);

export const StatusBadge = styled(Typography)(
    ({
        theme: {
            typography: { pxToRem },
            palette,
            spacing,
        },
    }) => ({
        fontSize: pxToRem(8),
        fontWeight: 900,
        textTransform: 'uppercase',
        padding: spacing(0.5, 2),
        borderRadius: pxToRem(4),
        backgroundColor: palette.grey[200],
        color: palette.text.secondary,
        border: `1px solid ${palette.divider}`,
    }),
);

export const MetaFooter = styled(Box)(
    ({
        theme: {
            palette,
            typography: { pxToRem },
        },
    }) => ({
        display: 'flex',
        flexDirection: 'column',
        paddingTop: pxToRem(12),
        borderTop: `1px solid ${alpha(palette.divider, 0.5)}`,
        gap: pxToRem(8),
    }),
);

export const DeadlineInfo = styled(Box)(
    ({
        theme: {
            palette,
            typography: { pxToRem },
        },
    }) => ({
        display: 'flex',
        alignItems: 'center',
        gap: pxToRem(4),
        color: palette.text.secondary,
        minWidth: 0,
        '& svg': { fontSize: pxToRem(16), flexShrink: 0 },
        '& .text': {
            fontSize: pxToRem(12),
            fontWeight: 500,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
    }),
);

export const AssigneeInfo = styled(Box)(
    ({
        theme: {
            typography: { pxToRem },
        },
    }) => ({
        display: 'flex',
        alignItems: 'center',
        gap: pxToRem(6),
        minWidth: 0,
        flexShrink: 0,
    }),
);

export const AssigneeName = styled(Typography)(
    ({
        theme: {
            typography: { pxToRem },
        },
    }) => ({
        fontSize: pxToRem(12),
        fontWeight: 600,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }),
);
