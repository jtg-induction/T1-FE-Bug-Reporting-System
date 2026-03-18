import { useParams } from 'react-router-dom';

import { CircularProgress,Divider, Stack, Typography } from '@mui/material';

import { CommentInput, CommentItem } from '@components';
import { 
    useCreateCommentMutation, 
    useDeleteCommentMutation, 
    useGetProjectCommentsQuery, 
    useUpdateCommentMutation 
} from '@service';

import {  
    EmptyStateText, 
    LoadingWrapper, 
    MainStack
} from './CommentSection.styles';

export const CommentSectionContainer = () => {
    const { pid: projectId, tid: ticketId } = useParams<{ pid: string; tid: string }>();
    
    const { data: comments, isLoading: isFetching } = useGetProjectCommentsQuery(
        { projectId: projectId!, ticketId: ticketId! }, 
        { skip: !projectId || !ticketId }
    );

    const [createComment, { isLoading: isPosting }] = useCreateCommentMutation();
    const [updateComment, { isLoading: isUpdating }] = useUpdateCommentMutation();
    const [deleteComment] = useDeleteCommentMutation();

    const handleSaveComment = async (markdownContent: string) => {
        try {
            await createComment({ 
                projectId: projectId!, 
                ticketId: ticketId!, 
                data: { description: markdownContent } 
            }).unwrap();
        } catch  {
            
        }
    };

    const handleUpdateComment = async (commentId: string, content: string) => {
        try {
            await updateComment({ 
                projectId: projectId!, 
                ticketId: ticketId!, 
                commentId, 
                data: { description: content } 
            }).unwrap();
        } catch {
        }
    };

    const handleDeleteComment = async (commentId: string) => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            try {
                await deleteComment({ 
                    projectId: projectId!, 
                    ticketId: ticketId!, 
                    commentId 
                }).unwrap();
            } catch {
                
            }
        }
    };

    const commentsData = comments?.data.results ?? [];

    return (
        <MainStack spacing={4}>
            <Typography variant="h6">Discussion</Typography>
            
            <CommentInput onSubmit={() => void handleSaveComment} isLoading={isPosting} />
            
            <Divider />

            <Stack>
                {isFetching ? (
                    <LoadingWrapper>
                        <CircularProgress size={24} />
                    </LoadingWrapper>
                ) : (
                    <Stack spacing={3}>
                        {commentsData.map((comment) => (
                            <CommentItem 
                                key={comment.id}
                                comment={comment}
                                onUpdate={handleUpdateComment}
                                onDelete={() => void handleDeleteComment}
                                isUpdating={isUpdating}
                            />
                        ))}

                        {commentsData.length === 0 && (
                            <EmptyStateText variant="body2">
                                No comments yet. Start the conversation!
                            </EmptyStateText>
                        )}
                    </Stack>
                )}
            </Stack>
        </MainStack>
    );
};