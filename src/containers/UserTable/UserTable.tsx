import { useMemo, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { handleFilterChange, handleSortChange } from 'utils/utils';

import { Add } from '@mui/icons-material';
import {
    Button,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';

import { SectionCard, Table } from '@components';
import {
    ProjectUserInviteFormContainer,
    ProjectUserInviteFormData,
} from '@containers';
import {
    useGetProjectMembersQuery,
    useGetUsersToInviteQuery,
    useInviteMemberMutation,
} from '@service';

import { getUserTableColumns, MEMBER_ROLES } from './UserTable.config';
import { UserTableProps } from './UserTable.types';
import { useAppDispatch } from 'redux/store';

export const UserTable = ({
    isAdmin,
    isActive,
    ownerId,
    isOwner,
    currentUserId,
}: ProjectUsersProps) => {
    const { id: projectId } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });
    const [filterModel, setFilterModel] = useState({});
    const [sortModel, setSortModel] = useState<string>();
    const { data: members, isLoading: isLoadingMembers } =
        useGetProjectMembersQuery(
            {
                projectId: projectId!,
                limit: paginationModel.pageSize,
                offset: paginationModel.pageSize * paginationModel.page,
                ordering: sortModel,
                filter: filterModel,
            },
            { skip: !projectId },
        );

    const { data: availableUsers } = useGetUsersToInviteQuery(projectId!, {
        skip: !isAdmin,
    });

    const [inviteMember, { isLoading: isInviting }] = useInviteMemberMutation();
    const [openInvite, setOpenInvite] = useState(false);

    const membersData = members?.data;
    const availableUsersData = availableUsers?.data ?? [];
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const userOptions = useMemo(() => {
        if (availableUsersData.length === 0) {
            return [{ LABEL: 'No users available to invite', VALUE: '' }];
        }
        return availableUsersData.map((user) => ({
            LABEL: `${user.first_name} ${user.last_name} (${user.email})`,
            VALUE: user.id,
        }));
    }, [availableUsersData]);

    const roleOptions = useMemo(
        () =>
            MEMBER_ROLES.map((role) => ({
                LABEL: role.label,
                VALUE: role.value,
            })),
        [],
    );

    const handleInviteSubmit = async (data: ProjectUserInviteFormData) => {
        if (!data.user_id || !projectId) return;
        const { error } = await inviteMember({ projectId, ...data });
        if (!error) {
            setOpenInvite(false);
        }
    };

    const columns = useMemo(
        () =>
            getUserTableColumns({
                ownerId,
                isAdmin,
                isActive,
                currentUserId,
                isOwner,
            }),
        [ownerId, isAdmin, isActive, currentUserId, isOwner],
    );

    return (
        <Stack spacing={4}>
            <SectionCard
                mainContent={
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
                        sx={{ cursor: 'pointer' }}
                    />
                }
                titleContent={
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
                                startIcon={!isMobile && <Add />}
                                onClick={() => setOpenInvite(true)}
                            >
                                {isMobile ? <Add /> : 'Invite Member'}
                            </Button>
                        )}
                    </Stack>
                }
            />

            <ProjectUserInviteFormContainer
                open={openInvite}
                onClose={() => setOpenInvite(false)}
                onSubmit={handleInviteSubmit}
                isLoading={isInviting}
                userOptions={userOptions}
                roleOptions={roleOptions}
            />
        </Stack>
    );
};
