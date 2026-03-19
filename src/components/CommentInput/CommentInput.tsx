import { useEffect, useState } from 'react';

import { Markdown } from 'tiptap-markdown';

import {
    Code,
    FormatBold,
    FormatItalic,
    FormatListBulleted,
    FormatListNumbered,
    FormatQuote,
    Title,
} from '@mui/icons-material';
import { Button, Divider, Stack, ToggleButton } from '@mui/material';

import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import {
    InputWrapper,
    StyledEditorContent,
    StyledToolbar,
} from './CommentInput.styles';
import { CommentInputProps } from './CommentInput.types';

export const CommentInput = ({
    onSubmit,
    onCancel,
    isLoading,
    initialContent = '',
    buttonText,
}: CommentInputProps) => {
    const [isEmpty, setIsEmpty] = useState(!initialContent);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Markdown.configure({
                tightLists: true,
                bulletListMarker: '-',
            }),
        ],
        content: initialContent,
        onUpdate: ({ editor: updatedEditor }) => {
            setIsEmpty(updatedEditor.isEmpty);
        },
    });

    useEffect(() => {
        if (editor && !editor.isDestroyed && initialContent && editor.isEmpty) {
            editor.commands.setContent(initialContent);
        }
    }, [editor, initialContent]);

    const handleAction = () => {
        if (editor && !editor.isEmpty) {
            const md = (
                editor.storage.markdown as { getMarkdown: () => string }
            ).getMarkdown();
            onSubmit(md);

            if (!initialContent) {
                editor.commands.clearContent();
            }
        }
    };
    if (!editor) return null;

    return (
        <InputWrapper>
            <StyledToolbar size="small">
                <ToggleButton
                    value="bold"
                    selected={editor.isActive('bold')}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <FormatBold fontSize="small" />
                </ToggleButton>

                <ToggleButton
                    value="italic"
                    selected={editor.isActive('italic')}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <FormatItalic fontSize="small" />
                </ToggleButton>

                <ToggleButton
                    value="heading"
                    selected={editor.isActive('heading', { level: 3 })}
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                >
                    <Title fontSize="small" />
                </ToggleButton>

                <ToggleButton
                    value="bulletList"
                    selected={editor.isActive('bulletList')}
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                >
                    <FormatListBulleted fontSize="small" />
                </ToggleButton>

                <ToggleButton
                    value="orderedList"
                    selected={editor.isActive('orderedList')}
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                >
                    <FormatListNumbered fontSize="small" />
                </ToggleButton>

                <ToggleButton
                    value="blockquote"
                    selected={editor.isActive('blockquote')}
                    onClick={() =>
                        editor.chain().focus().toggleBlockquote().run()
                    }
                >
                    <FormatQuote fontSize="small" />
                </ToggleButton>

                <ToggleButton
                    value="code"
                    selected={editor.isActive('code')}
                    onClick={() => editor.chain().focus().toggleCode().run()}
                >
                    <Code fontSize="small" />
                </ToggleButton>
            </StyledToolbar>

            <Divider />

            <StyledEditorContent editor={editor} />

            <Divider />

            <Stack
                direction="row"
                justifyContent="flex-end"
                spacing={1}
                sx={{ p: 1 }}
            >
                {onCancel && (
                    <Button
                        size="small"
                        variant="text"
                        color="inherit"
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                )}
                <Button
                    size="small"
                    variant="contained"
                    disabled={isLoading || isEmpty}
                    onClick={handleAction}
                >
                    {isLoading
                        ? 'Processing...'
                        : buttonText ||
                          (initialContent ? 'Save Changes' : 'Comment')}
                </Button>
            </Stack>
        </InputWrapper>
    );
};
