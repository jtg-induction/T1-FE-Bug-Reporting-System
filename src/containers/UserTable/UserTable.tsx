import { useMemo, useState } from 'react';

import { operatorMap } from 'constant/operatorMap';
import { useParams, useSearchParams } from 'react-router-dom';
import { showSnackbar } from 'redux/features/profileSlice';
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
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { SectionCard, Table } from '@components';
import {
    ProjectUserInviteFormContainer,
    ProjectUserInviteFormData,
    UserTableActions,
} from '@containers';
import {
    useGetProjectMembersQuery,
    useGetUsersToInviteQuery,
    useInviteMemberMutation,
} from '@service';

import { MEMBER_ROLES } from './UserTable.config';
import { ApiError, ProjectMember, ProjectUsersProps } from './UserTable.types';

export const UserTable = ({
    isAdmin,
    isActive,
    ownerId,
    isOwner,
    currentUserId,
}: ProjectUsersProps) => {
    const { id: projectId } = useParams<{ id: string }>();
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
        skip: !isAdmin || !isActive,
    });

    const [inviteMember, { isLoading: isInviting, error: inviteError }] =
        useInviteMemberMutation();

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
        if (!data.user_id) return;
        try {
            await inviteMember({
                projectId: projectId!,
                ...data,
            }).unwrap();
            setOpenInvite(false);
        } catch {
            dispatch(
                showSnackbar({
                    message: 'User Invite Failed',
                    severity: 'error',
                }),
            );
        }
    };

    const handlePaginationChange = (newModel: {
        page: number;
        pageSize: number;
    }) => {
        setPaginationModel(newModel);
        setSearchParams((params) => {
            if (newModel.page === 0) {
                params.delete('page');
            } else {
                params.set('page', newModel.page.toString());
            }
            return params;
        });
    };

    const columns: GridColDef<ProjectMember>[] = [
        {
            field: 'index',
            headerName: 'ID',
            width: 80,
            filterable: false,
            sortable: false,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {
                const pageModel = params.api.state.pagination.paginationModel;
                const page = pageModel.page;
                const pageSize = pageModel.pageSize;
                const relativeIndex =
                    params.api.getRowIndexRelativeToVisibleRows(params.id) + 1;
                return page * pageSize + relativeIndex;
            },
        },
        {
            field: 'first_name',
            headerName: 'First Name',
            width: 160,
            valueGetter: (_, row) => row.member?.first_name,
        },
        {
            field: 'last_name',
            headerName: 'Last Name',
            width: 160,
            valueGetter: (_, row) => row.member?.last_name,
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1.5,
            minWidth: 320,
            valueGetter: (_, row) => row.member?.email,
        },
        {
            field: 'designation',
            headerName: 'Designation',
            width: 160,
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
            width: 120,
            type: 'singleSelect',
            valueOptions: [
                { value: 1, label: 'Member' },
                { value: 2, label: 'Admin' },
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
                const userId = params.row.member?.id;
                if (!userId) return null;

                return (
                    <UserTableActions
                        userId={userId}
                        isRowAdmin={params.row.role === 2}
                        isAdmin={isAdmin}
                        isActive={isActive}
                        currentUserId={currentUserId}
                        ownerId={ownerId}
                        isOwner={isOwner}
                    />
                );
            },
        },
    ];

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
                errorMessage={(inviteError as ApiError)?.data?.detail}
                userOptions={userOptions}
                roleOptions={roleOptions}
            />
        </Stack>
    );
};
