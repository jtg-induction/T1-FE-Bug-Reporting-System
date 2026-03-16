import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { handleFilterChange, handleSortChange } from 'utils/utils';

import {
    AccountCircle,
    Add,
    PersonRemove,
    SupervisorAccount,
} from '@mui/icons-material';
import {
    Alert,
    Button,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import {
    ActionMenu,
    ActionMenuItem,
    Dialog,
    SectionCard,
    Table,
} from '@components';
import { PRIVATE_PATHS } from '@constant';
import {
    useChangeRoleMutation,
    useGetProjectMembersQuery,
    useGetUsersToInviteQuery,
    useInviteMemberMutation,
    useRevokeMemberMutation,
} from '@service';

import { MEMBER_ROLES } from './UserTable.config';
import { ApiError, ProjectMember, ProjectUsersProps } from './UserTable.types';

export const ProjectUsers = ({
    isAdmin,
    isActive,
    ownerId,
    isOwner,
    currentUserId,
    paginationModel,
    ordering,
    filter,
    setPaginationModel,
    setFilterModel,
    setSortModel,
}: ProjectUsersProps) => {
    const { id: projectId } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: members, isLoading: isLoadingMembers } =
        useGetProjectMembersQuery(
            {
                projectId: projectId,
                limit: paginationModel.pageSize,
                offset: paginationModel.pageSize * paginationModel.page,
                ordering: ordering,
                filter: filter,
            },
            { skip: !projectId },
        );
    const { data: availableUsers } = useGetUsersToInviteQuery(projectId!, {
        skip: !isAdmin,
    });
    const [inviteMember, { isLoading: isInviting, error: inviteError }] =
        useInviteMemberMutation();
    const [changeRole] = useChangeRoleMutation();
    const [revokeMember] = useRevokeMemberMutation();

    const [openInvite, setOpenInvite] = useState(false);
    const [inviteData, setInviteData] = useState({ user_id: '', role: 0 });

    const handlePromote = (userId: string) => {
        void (async () => {
            if (window.confirm('Promote this user to Admin?')) {
                try {
                    await changeRole({
                        projectId: projectId!,
                        user_id: userId,
                        role: 1,
                    }).unwrap();
                } catch {}
            }
        })();
    };

    const handleRevoke = (userId: string) => {
        void (async () => {
            if (
                window.confirm(
                    'Are you sure you want to remove this user from the project?',
                )
            ) {
                try {
                    await revokeMember({
                        projectId: projectId!,
                        user_id: userId,
                    }).unwrap();
                } catch {}
            }
        })();
    };

    const columns: GridColDef<ProjectMember>[] = [
        {
            field: 'index',
            headerName: 'ID',
            width: 70,
            filterable: false,
            sortable: false,
            renderCell: (params) =>
                params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
        },
        {
            field: 'first_name',
            headerName: 'First Name',
            flex: 1,
            valueGetter: (_, row) => row.member?.first_name,
        },
        {
            field: 'last_name',
            headerName: 'Last Name',
            flex: 1,
            valueGetter: (_, row) => row.member?.last_name,
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1.5,
            valueGetter: (_, row) => row.member?.email,
        },
        {
            field: 'designation',
            headerName: 'Designation',
            flex: 1,
            type: 'singleSelect',
            valueOptions: [
                { value: 'M', label: 'Manager' },
                { value: 'TL', label: 'Team Lead' },
                { value: 'INTERN', label: 'Intern' },
                { value: 'SD', label: 'Software Developer' },
                { value: 'SSD', label: 'Senior Developer' },
            ],
            valueGetter: (_, row) => row.member?.designation,
        },
        {
            field: 'role',
            headerName: 'Role',
            flex: 1,
            type: 'singleSelect',
            valueOptions: [
                { value: 0, label: 'Member' },
                { value: 1, label: 'Admin' },
            ],
            renderCell: (params) => {
                if (params.row.member?.id === ownerId) {
                    return 'Owner';
                }
                return MEMBER_ROLES.find((r) => r.value === params.value)
                    ?.label;
            },
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 80,
            sortable: false,
            filterable: false,
            align: 'center',
            renderCell: (params: GridRenderCellParams<ProjectMember>) => {
                const isRowAdmin = params.row.role === 1;
                const userId = params.row.member?.id;

                if (!userId) return null;

                const canManageUser =
                    isAdmin &&
                    isActive &&
                    userId !== currentUserId &&
                    userId !== ownerId;
                const canPromote = canManageUser && !isRowAdmin;
                const canRevoke = canManageUser && (!isRowAdmin || isOwner);

                const menuOptions: ActionMenuItem[] = [
                    {
                        id: 'view-profile',
                        label: 'View Profile',
                        icon: <AccountCircle fontSize="small" />,
                        onClick: () =>
                            navigate(`${PRIVATE_PATHS.PROFILE}/${userId}`),
                    },
                    canPromote && {
                        id: 'promote',
                        label: 'Promote to Admin',
                        icon: <SupervisorAccount fontSize="small" />,
                        onClick: () => handlePromote(userId),
                    },
                    canRevoke && {
                        id: 'revoke',
                        label: 'Remove User',
                        icon: <PersonRemove fontSize="small" />,
                        onClick: () => handleRevoke(userId),
                        textColor: 'error.main',
                    },
                ].filter((item): item is ActionMenuItem => Boolean(item));

                return <ActionMenu items={menuOptions} />;
            },
        },
    ];

    const handleInvite = () => {
        void (async () => {
            if (!inviteData.user_id) return;
            try {
                await inviteMember({
                    projectId: projectId!,
                    ...inviteData,
                }).unwrap();
                setOpenInvite(false);
                setInviteData({ user_id: '', role: 0 });
            } catch {}
        })();
    };

    const membersData = members?.data;
    const availableUsersData = availableUsers?.data ?? [];

    return (
        <Stack spacing={4}>
            <SectionCard
                MainContent={
                    <Table
                        rowCount={membersData?.count ?? 0}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        onFilterModelChange={(newModel) =>
                            handleFilterChange(newModel, setFilterModel)
                        }
                        onSortModelChange={(newModel) =>
                            handleSortChange(newModel, setSortModel)
                        }
                        loading={isLoadingMembers}
                        rows={membersData?.results ?? []}
                        columns={columns}
                        pageSize={5}
                    />
                }
                TitleContent={
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography variant="h6" fontWeight="bold">
                            Project Members
                        </Typography>
                        {isAdmin && isActive && (
                            <Button
                                variant="contained"
                                startIcon={<Add />}
                                onClick={() => setOpenInvite(true)}
                                size="small"
                            >
                                Invite Member
                            </Button>
                        )}
                    </Stack>
                }
            />

            <Dialog
                open={openInvite}
                handleClose={() => setOpenInvite(false)}
                title="Invite Member"
                DialogActionsContent={
                    <>
                        <Button
                            onClick={() => setOpenInvite(false)}
                            color="inherit"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleInvite}
                            disabled={isInviting || !inviteData.user_id}
                        >
                            {isInviting ? 'Inviting...' : 'Invite'}
                        </Button>
                    </>
                }
                DialogContentData={
                    <Stack spacing={3} width="100%" sx={{ pt: 1 }}>
                        {inviteError && (
                            <Alert severity="error">
                                {(inviteError as ApiError)?.data?.detail ||
                                    'Invitation failed'}
                            </Alert>
                        )}
                        <TextField
                            select
                            fullWidth
                            label="Select User"
                            value={inviteData.user_id}
                            onChange={(e) =>
                                setInviteData({
                                    ...inviteData,
                                    user_id: e.target.value,
                                })
                            }
                        >
                            {availableUsersData?.length > 0 ? (
                                availableUsersData.map((user) => (
                                    <MenuItem key={user.id} value={user.id}>
                                        {user.first_name} {user.last_name} (
                                        {user.email})
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem disabled>
                                    No users available to invite
                                </MenuItem>
                            )}
                        </TextField>
                        <TextField
                            select
                            fullWidth
                            label="Role"
                            value={inviteData.role}
                            onChange={(e) =>
                                setInviteData({
                                    ...inviteData,
                                    role: Number(e.target.value),
                                })
                            }
                        >
                            {MEMBER_ROLES.map((role) => (
                                <MenuItem key={role.value} value={role.value}>
                                    {role.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Stack>
                }
            />
        </Stack>
    );
};
