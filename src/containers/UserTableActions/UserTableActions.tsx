import { useNavigate, useParams } from 'react-router-dom';

import {
    AccountCircle,
    PersonRemove,
    SupervisorAccount,
} from '@mui/icons-material';

import { ActionMenu, ActionMenuItem } from '@components';
import { PRIVATE_PATHS } from '@constant';
import { useChangeRoleMutation, useRevokeMemberMutation } from '@service';

interface UserTableActionsProps {
    userId: string;
    isRowAdmin: boolean;
    isAdmin: boolean;
    isActive: boolean;
    currentUserId?: string;
    ownerId?: string;
    isOwner: boolean;
}

export const UserTableActions = ({
    userId,
    isRowAdmin,
    isAdmin,
    isActive,
    currentUserId,
    ownerId,
    isOwner,
}: UserTableActionsProps) => {
    const { id: projectId } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [changeRole] = useChangeRoleMutation();
    const [revokeMember] = useRevokeMemberMutation();

    const handlePromote = () => {
        if (!projectId) return;
        void changeRole({ projectId, user_id: userId, role: 2 });
    };

    const handleRevoke = () => {
        if (!projectId) return;
        void revokeMember({ projectId, user_id: userId });
    };

    const canManageUser =
        isAdmin && isActive && userId !== currentUserId && userId !== ownerId;
    const canPromote = canManageUser && !isRowAdmin;
    const canRevoke = canManageUser && (!isRowAdmin || isOwner);

    const menuOptions: ActionMenuItem[] = [
        {
            id: 'view-profile',
            label: 'View Profile',
            icon: <AccountCircle fontSize="small" />,
            onClick: () => void navigate(`${PRIVATE_PATHS.PROFILE}/${userId}`),
            display: true,
        },
        {
            id: 'promote',
            label: 'Promote to Admin',
            icon: <SupervisorAccount fontSize="small" />,
            onClick: handlePromote,
            display: canPromote,
        },
        {
            id: 'revoke',
            label: 'Remove User',
            icon: <PersonRemove fontSize="small" />,
            onClick: handleRevoke,
            textColor: 'error.main',
            display: canRevoke,
        },
    ];

    return <ActionMenu items={menuOptions} />;
};
