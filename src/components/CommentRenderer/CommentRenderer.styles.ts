import { Box, Link, List, ListItem, styled, Typography } from '@mui/material';

export const StyledParagraph = styled(Typography)(
    ({
        theme: {
            typography: { pxToRem },
        },
    }) => ({
        marginBottom: pxToRem(4),
    }),
);

export const StyledLink = styled(Link)({
    cursor: 'pointer',
});

export const StyledUl = styled(List)(
    ({
        theme: {
            typography: { pxToRem },
        },
    }) => ({
        listStyleType: 'disc',
        paddingLeft: pxToRem(20),
    }),
);

export const StyledLi = styled(ListItem)(() => ({
    display: 'list-item',
    padding: 0,
}));

export const BoldSpan = styled(Box)({
    display: 'inline',
    fontWeight: 'bold',
}) as typeof Box;

export const ItalicSpan = styled(Box)({
    display: 'inline',
    fontStyle: 'italic',
}) as typeof Box;

export const StyledH3 = styled(Typography)(
    ({
        theme: {
            typography: { pxToRem },
        },
    }) => ({
        margin: `${pxToRem(4)} 0`,
        fontWeight: 'bold',
    }),
);

export const StyledBlockquote = styled(Box)(
    ({
        theme: {
            typography: { pxToRem },
            palette,
        },
    }) => ({
        borderLeft: `4px solid ${palette.grey[300]}`,
        paddingLeft: pxToRem(8),
        marginTop: pxToRem(8),
        marginBottom: pxToRem(8),
        color: palette.text.secondary,
        fontStyle: 'italic',
    }),
);

export const StyledCode = styled(Box)(
    ({
        theme: {
            typography: { pxToRem },
            palette,
        },
    }) => ({
        backgroundColor: palette.grey[100],
        padding: pxToRem(2),
        borderRadius: 12,
        fontFamily: 'monospace',
        fontSize: pxToRem(12),
        display: 'inline',
    }),
) as typeof Box;
