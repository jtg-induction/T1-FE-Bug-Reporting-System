import { Box, styled, ToggleButtonGroup } from '@mui/material';

import { EditorContent } from '@tiptap/react';

export const InputWrapper = styled(Box)(({ theme: { palette } }) => ({
    border: '1px solid',
    borderColor: palette.divider,
    borderRadius: 8,
    backgroundColor: palette.background.paper,
    '&:focus-within': {
        borderColor: palette.primary.main,
    },
}));

export const StyledToolbar = styled(ToggleButtonGroup)({
    flexWrap: 'wrap',
    border: 'none',
    padding: 4,
});

export const StyledEditorContent = styled(EditorContent)(({ theme: { typography: { pxToRem } } }) => ({
    '& .tiptap': {
        minHeight: pxToRem(120),
        padding: `0 ${pxToRem(12)}`,
        outline: 'none',
        fontFamily: 'inherit',
        fontSize: pxToRem(16),
    }
}));
