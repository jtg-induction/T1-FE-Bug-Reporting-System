import { useState } from 'react';

import { Delete, Edit } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';

import { ActionMenu, CommentInput, CommentRenderer } from '@components';
import { getTimeFromNow } from '@utils';

import {
    AuthorInfo,
    AvatarPlaceholder,
    ContentWrapper,
    EditContainer,
    HeaderStack,
    ItemContainer,
    Metadata,
} from './CommentItem.styles';
import { CommentItemProps } from './CommentItem.types';

export const CommentItem = ({
    comment,
    onUpdate,
    onDelete,
    isUpdating,
}: CommentItemProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleUpdate = async (content: string) => {
        await onUpdate(comment.id, content);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <EditContainer>
                <CommentInput
                    initialContent={comment.description}
                    isLoading={isUpdating}
                    onSubmit={(e) => void handleUpdate(e)}
                    onCancel={() => setIsEditing(false)}
                    buttonText="Save Changes"
                />
            </EditContainer>
        );
    }

    const menuItems = [
        {
            id: 'edit',
            label: 'Edit',
            icon: <Edit fontSize="small" />,
            onClick: () => setIsEditing(true),
        },
        {
            id: 'delete',
            label: 'Delete',
            icon: <Delete fontSize="small" />,
            textColor: 'error.main',
            iconColor: 'error.main',
            onClick: () => onDelete(comment.id),
        },
    ];

    const initials = comment.author_name
        ?.split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <ItemContainer>
            <HeaderStack>
                <AuthorInfo>
                    <AvatarPlaceholder>{initials}</AvatarPlaceholder>
                    <Stack>
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600 }}
                        >
                            {comment.author_name}
                        </Typography>
                        <Metadata variant="caption">
                            {`${getTimeFromNow(comment.created_at)} ago`}
                        </Metadata>
                    </Stack>
                </AuthorInfo>

                {comment.can_edit && <ActionMenu items={menuItems} />}
            </HeaderStack>

            <ContentWrapper>
                <CommentRenderer content={comment.description} />
            </ContentWrapper>
        </ItemContainer>
    );
};
