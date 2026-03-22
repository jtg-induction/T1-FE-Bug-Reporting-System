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
    const [isEmpty, setIsEmpty] = useState<boolean>(!initialContent);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [3] },
            }),
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
        if (editor && initialContent && editor.isEmpty) {
            editor.commands.setContent(initialContent);
        }
    }, [editor, initialContent]);

    if (!editor) return null;

    const handleToggle = (command: () => void) => {
        command();
        editor.chain().focus().run();
    };

    const handleAction = () => {
        const markdownStorage = editor.storage.markdown as {
            getMarkdown: () => string;
        };
        onSubmit(markdownStorage.getMarkdown());
        if (!initialContent) {
            editor.commands.clearContent();
        }
    };

    return (
        <InputWrapper>
            <StyledToolbar size="small">
                <ToggleButton
                    value="bold"
                    onClick={() =>
                        handleToggle(() => editor.chain().toggleBold().run())
                    }
                >
                    <FormatBold fontSize="small" />
                </ToggleButton>
                <ToggleButton
                    value="italic"
                    onClick={() =>
                        handleToggle(() => editor.chain().toggleItalic().run())
                    }
                >
                    <FormatItalic fontSize="small" />
                </ToggleButton>
                <ToggleButton
                    value="heading"
                    onClick={() =>
                        handleToggle(() =>
                            editor.chain().toggleHeading({ level: 3 }).run(),
                        )
                    }
                >
                    <Title fontSize="small" />
                </ToggleButton>
                <ToggleButton
                    value="bulletList"
                    onClick={() =>
                        handleToggle(() =>
                            editor.chain().toggleBulletList().run(),
                        )
                    }
                >
                    <FormatListBulleted fontSize="small" />
                </ToggleButton>
                <ToggleButton
                    value="orderedList"
                    onClick={() =>
                        handleToggle(() =>
                            editor.chain().toggleOrderedList().run(),
                        )
                    }
                >
                    <FormatListNumbered fontSize="small" />
                </ToggleButton>
                <ToggleButton
                    value="blockquote"
                    onClick={() =>
                        handleToggle(() =>
                            editor.chain().toggleBlockquote().run(),
                        )
                    }
                >
                    <FormatQuote fontSize="small" />
                </ToggleButton>
                <ToggleButton
                    value="code"
                    onClick={() =>
                        handleToggle(() => editor.chain().toggleCode().run())
                    }
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
                        : buttonText || (initialContent ? 'Save' : 'Comment')}
                </Button>
            </Stack>
        </InputWrapper>
    );
};
