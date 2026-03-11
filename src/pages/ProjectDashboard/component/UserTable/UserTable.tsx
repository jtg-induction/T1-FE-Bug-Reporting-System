import { useState } from 'react';

import { useParams } from 'react-router-dom';
import {
    useChangeRoleMutation,
    useGetProjectMembersQuery,
    useGetUsersToInviteQuery,
    useInviteMemberMutation,
    useRevokeMemberMutation,
} from 'redux/apiSlice';
import { handleFilterChange, handleSortChange } from 'utils/utils';

import { Add, PersonRemove, SupervisorAccount } from '@mui/icons-material';
import {
    Alert,
    Button,
    IconButton,
    MenuItem,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { Dialog } from '@components/Dialog';
import { SectionCard } from '@components/SectionCard';
import { Table } from '@components/Table';

import { MEMBER_ROLES } from './UserTable.config';
import {
    ApiError,
    ProjectMember,
    ProjectUsersProps,
    User,
} from './UserTable.types';

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
            width: 120,
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams<ProjectMember>) => {
                const isRowAdmin = params.row.role === 1;
                const userId = params.row.member?.id;

                if (!isAdmin || !isActive) return null;
                if (userId === currentUserId) return null;
                if (!userId || userId === ownerId) return null;
                if (isRowAdmin && !isOwner) return null;
                return (
                    <Stack direction="row" spacing={1}>
                        {!isRowAdmin && (
                            <Tooltip title="Promote to Admin">
                                <IconButton
                                    size="small"
                                    color="warning"
                                    onClick={() => handlePromote(userId)}
                                >
                                    <SupervisorAccount fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        )}
                        <Tooltip title="Revoke Member">
                            <IconButton
                                size="small"
                                color="warning"
                                onClick={() => handleRevoke(userId)}
                            >
                                <PersonRemove fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                );
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

    return (
        <Stack spacing={4}>
            <SectionCard
                MainContent={
                    <Table
                        rowCount={members?.count ?? 0}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        onFilterModelChange={(newModel) =>
                            handleFilterChange(newModel, setFilterModel)
                        }
                        onSortModelChange={(newModel) =>
                            handleSortChange(newModel, setSortModel)
                        }
                        loading={isLoadingMembers}
                        rows={members?.results ?? []}
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
                        <Typography variant="h2">Project Members</Typography>
                        {isAdmin && isActive && (
                            <Button
                                variant="contained"
                                startIcon={<Add />}
                                onClick={() => setOpenInvite(true)}
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
                            disabled={isInviting}
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
                            {(availableUsers as User[])?.map((user) => (
                                <MenuItem key={user.id} value={user.id}>
                                    {user.first_name} {user.last_name} (
                                    {user.email})
                                </MenuItem>
                            ))}
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
