import {
    Box,
    styled,
    Theme,
    ToggleButtonGroup,
    Typography,
} from '@mui/material';
import { toggleButtonClasses } from '@mui/material/ToggleButton';

import { EditorContent } from '@tiptap/react';

const getCodeStyles = ({
    palette,
    typography: { pxToRem },
    spacing,
}: Theme) => ({
    backgroundColor: palette.grey[100],
    color: palette.error.main,
    padding: spacing(1, 3),
    borderRadius: 4,
    fontFamily: 'monospace',
    fontSize: pxToRem(15),
    border: `1px solid ${palette.divider}`,
});

const getBlockquoteStyles = ({ palette, spacing }: Theme) => ({
    borderLeft: `4px solid ${palette.primary.light}`,
    padding: spacing(2, 5),
    margin: spacing(4, 0),
    backgroundColor: palette.grey[50],
    color: palette.text.secondary,
    fontStyle: 'italic',
});

export const InputWrapper = styled(Box)(({ theme: { palette } }) => ({
    border: 1,
    borderStyle: 'solid',
    borderColor: palette.divider,
    borderRadius: 8,
    backgroundColor: palette.background.paper,
    '&:focus-within': {
        borderColor: palette.primary.main,
    },
}));

export const StyledToolbar = styled(ToggleButtonGroup)({
    padding: 6,
    border: 'none',
    gap: 4,
    [`& .${toggleButtonClasses.root}`]: {
        border: 'none',
        borderRadius: 4,
        [`&.${toggleButtonClasses.selected}`]: {
            backgroundColor: 'transparent',
            color: 'inherit',
        },
    },
});

export const StyledEditorContent = styled(EditorContent)(({ theme }) => ({
    '& .tiptap': {
        minHeight: theme.typography.pxToRem(150),
        padding: theme.typography.pxToRem(16),
        outline: 'none',
        fontSize: theme.typography.pxToRem(18),
        lineHeight: 1.6,
        '& h3': {
            fontSize: theme.typography.pxToRem(22),
            fontWeight: 700,
            margin: theme.spacing(4, 0, 2),
        },
        '& p': { margin: theme.spacing(2, 0) },
        '& code': getCodeStyles(theme),
        '& blockquote': getBlockquoteStyles(theme),
        '& ul, & ol': { paddingLeft: theme.typography.pxToRem(28) },
        '& li': { marginBottom: 4 },
    },
}));

export const RenderContainer = styled(Box)(
    ({
        theme: {
            typography: { pxToRem },
        },
    }) => ({
        fontSize: pxToRem(18),
        lineHeight: 1.6,
    }),
);

export const StyledParagraph = styled(Typography)(
    ({
        theme: {
            typography: { pxToRem },
        },
    }) => ({
        fontSize: 'inherit',
        lineHeight: 'inherit',
        marginBottom: pxToRem(8),
    }),
);

export const StyledH3 = styled(Typography)(
    ({
        theme: {
            typography: { pxToRem },
            spacing,
        },
    }) => ({
        fontSize: pxToRem(24),
        fontWeight: 700,
        margin: spacing(4, 0, 2),
    }),
);

export const StyledUl = styled('ul')(
    ({
        theme: {
            typography: { pxToRem },
            spacing,
        },
    }) => ({
        paddingLeft: pxToRem(28),
        margin: spacing(2, 0),
        '& li': { marginBottom: 4 },
    }),
);

export const StyledLi = styled('li')({
    display: 'list-item',
});

export const StyledCode = styled('code')(({ theme }) => getCodeStyles(theme));

export const StyledBlockquote = styled('blockquote')(({ theme }) =>
    getBlockquoteStyles(theme),
);
