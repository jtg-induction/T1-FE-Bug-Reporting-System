import { useMemo, useState } from 'react';

import { operatorMap } from 'constant/operatorMap';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from 'redux/store';
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

    const [searchParams, setSearchParams] = useSearchParams();
    const pageQuery = searchParams.get('page');
    const filterQuery = searchParams.get('filter');

    const [paginationModel, setPaginationModel] = useState({
        page: pageQuery ? parseInt(pageQuery, 10) : 0,
        pageSize: 5,
    });

    const initialGridFilter = (() => {
        if (!filterQuery) return undefined;

        const [field, operator, ...rest] = filterQuery.split(' ');
        const valueStr = rest.join(' ');
        const value =
            valueStr && !isNaN(Number(valueStr)) ? Number(valueStr) : valueStr;

        if (operator === 'isEmpty' || operator === 'isNotEmpty') {
            return { items: [{ field, operator }] };
        }
        return { items: [{ field, operator, value }] };
    })();

    const [filterModel, setFilterModel] = useState<object>(() => {
        if (!filterQuery) return {};

        const [field, operator, ...rest] = filterQuery.split(' ');
        const valueStr = rest.join(' ');

        if (operator === 'isEmpty' || operator === 'isNotEmpty') {
            return { [`${field}__isnull`]: operator === 'isEmpty' };
        }

        const lookup = operatorMap[operator];
        const key = lookup ? `${field}__${lookup}` : field;
        const value =
            valueStr && !isNaN(Number(valueStr)) ? Number(valueStr) : valueStr;

        return { [key]: value };
    });

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
                        onPaginationModelChange={handlePaginationChange}
                        onFilterModelChange={(newModel) =>
                            handleFilterChange(
                                newModel,
                                setFilterModel,
                                setSearchParams,
                            )
                        }
                        onSortModelChange={(newModel) =>
                            handleSortChange(newModel, setSortModel)
                        }
                        loading={isLoadingMembers}
                        rows={membersData?.results ?? []}
                        columns={columns}
                        pageSize={5}
                        sx={{ cursor: 'pointer' }}
                        initialState={{
                            ...(initialGridFilter && {
                                filter: {
                                    filterModel: initialGridFilter,
                                },
                            }),
                        }}
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
