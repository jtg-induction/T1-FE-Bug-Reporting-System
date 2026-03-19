export interface CommentInputProps {
    onSubmit: (content: string) => void;
    onCancel?: () => void;
    isLoading: boolean;
    initialContent?: string;
    buttonText?: string;
}
