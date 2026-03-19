import { CommentResponse } from 'types/common';

export interface CommentItemProps {
    comment: CommentResponse;
    onUpdate: (id: string, content: string) => Promise<void>;
    onDelete: (id: string) => void;
    isUpdating: boolean;
}
