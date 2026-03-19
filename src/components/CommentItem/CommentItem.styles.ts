import { Box, Stack, styled, Typography } from '@mui/material';

export const ItemContainer = styled(Box)(
    ({
        theme: {
            typography: { pxToRem },
            palette,
        },
    }) => ({
        padding: pxToRem(8),
        backgroundColor: palette.background.paper,
        borderRadius: 12,
        border: `1px solid ${palette.divider}`,
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    }),
);

export const EditContainer = styled(Box)(
    ({
        theme: {
            typography: { pxToRem },
            palette,
        },
    }) => ({
        padding: pxToRem(8),
        backgroundColor: palette.background.default,
        borderRadius: 12,
        border: `2px solid ${palette.primary.main}`,
    }),
);

export const HeaderStack = styled(Stack)(
    ({
        theme: {
            typography: { pxToRem },
        },
    }) => ({
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: pxToRem(16),
    }),
);

export const AuthorInfo = styled(Stack)(
    ({
        theme: {
            typography: { pxToRem },
        },
    }) => ({
        flexDirection: 'row',
        gap: pxToRem(8),
        alignItems: 'center',
    }),
);

export const AvatarPlaceholder = styled(Box)(
    ({
        theme: {
            typography: { pxToRem },
            palette,
        },
    }) => ({
        width: 32,
        height: 32,
        borderRadius: '50%',
        backgroundColor: palette.primary.light,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: palette.primary.contrastText,
        fontWeight: 'bold',
        fontSize: pxToRem(12),
    }),
);

export const Metadata = styled(Typography)(
    ({
        theme: {
            typography: { pxToRem },
            palette,
        },
    }) => ({
        color: palette.text.secondary,
        fontSize: pxToRem(12),
        fontWeight: 400,
    }),
);

export const ContentWrapper = styled(Box)(
    ({
        theme: {
            typography: { pxToRem },
        },
    }) => ({
        paddingLeft: pxToRem(8),
    }),
);
