import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import {
    useCreateTicketMutation,
    useGetProjectMembersQuery,
    useGetProjectTicketsQuery,
} from 'redux/apiSlice';
import { TicketCreateResponse, UserData } from 'types/common';
import { handleFilterChange, handleSortChange } from 'utils/utils';

import { Add } from '@mui/icons-material';
import {
    Alert,
    Button,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { GridColDef, GridRowParams } from '@mui/x-data-grid';

import { Dialog } from '@components/Dialog';
import { SectionCard } from '@components/SectionCard';
import { Table } from '@components/Table';

import {
    INITIAL_TICKET_DATA,
    TICKET_SEVERITY,
    TICKET_STATUS,
} from './TicketTable.config';
import { ApiError, TicketData, TicketTableProps } from './TicketTable.types';

export const TicketTable = ({
    isAdmin,
    paginationModel,
    ordering,
    filter,
    setPaginationModel,
    setFilterModel,
    setSortModel,
}: TicketTableProps) => {
    const { id: projectId } = useParams<{ id: string }>();
    const { data: members, isLoading: isLoadingMembers } =
        useGetProjectTicketsQuery(
            {
                projectId: projectId,
                limit: paginationModel.pageSize,
                offset: paginationModel.pageSize * paginationModel.page,
                ordering: ordering,
                filter: filter,
            },
            { skip: !projectId },
        );
    const { data: assignableUsers } = useGetProjectMembersQuery(
        { projectId: projectId },
        {
            skip: !projectId,
        },
    );
    const [createTicket, { isLoading: isCreating, error: createError }] =
        useCreateTicketMutation();
    const navigate = useNavigate();
    // const [changeRole] = useChangeRoleMutation();
    // const [revokeMember] = useRevokeMemberMutation();

    const [openForm, setOpenForm] = useState(false);
    const [formData, setFormData] = useState(INITIAL_TICKET_DATA);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        } else if (formData.title.trim().length < 2) {
            newErrors.title = 'Title cannot be a single character';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        } else if (formData.description.trim().length < 2) {
            newErrors.description = 'Description cannot be a single character';
        }

        if (!formData.status) {
            newErrors.status = 'Key is required';
        }

        if (!formData.severity) {
            newErrors.severity = 'Severity is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // const handlePromote = (userId: string) => {
    //     void (async () => {
    //         if (window.confirm('Promote this user to Admin?')) {
    //             try {
    //                 await changeRole({
    //                     projectId: projectId!,
    //                     user_id: userId,
    //                     role: 1,
    //                 }).unwrap();
    //             } catch {}
    //         }
    //     })();
    // };

    // const handleRevoke = (userId: string) => {
    //     void (async () => {
    //         if (
    //             window.confirm(
    //                 'Are you sure you want to remove this user from the project?',
    //             )
    //         ) {
    //             try {
    //                 await revokeMember({
    //                     projectId: projectId!,
    //                     user_id: userId,
    //                 }).unwrap();
    //             } catch {
    //                 /* Handle error via toast or UI */
    //             }
    //         }
    //     })();
    // };

    const columns: GridColDef<TicketData>[] = [
        {
            field: 'index',
            headerName: 'ID',
            filterable: false,
            sortable: false,
            renderCell: (params) =>
                params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
        },
        {
            field: 'title',
            headerName: 'Title',
            minWidth: 100,
            valueGetter: (_, row) => row?.title,
        },
        {
            field: 'reporter',
            headerName: 'Reporter',
            valueGetter: (_, row) => row?.reporter,
        },
        {
            field: 'assignee',
            headerName: 'Assignee',
            valueGetter: (_, row) => row?.assignee,
        },
        {
            field: 'severity',
            headerName: 'Severity',
            type: 'singleSelect',
            valueOptions: [
                { value: 1, label: 'Low' },
                { value: 2, label: 'Mid' },
                { value: 3, label: 'High' },
            ],
            valueGetter: (_, row) => row?.status,
        },
        {
            field: 'status',
            headerName: 'Status',
            type: 'singleSelect',
            valueOptions: [
                { value: 1, label: 'Open' },
                { value: 2, label: 'Resolved' },
                { value: 3, label: 'In Progress' },
                { value: 4, label: 'Closed' },
            ],
            valueGetter: (_, row) => row?.status,
        },
        {
            field: 'deadline',
            headerName: 'Deadline',
            valueGetter: (_, row) => {
                if (row?.deadline == null) return 'None';
                const date = new Date(row?.deadline);
                return date.toDateString();
            },
        },
    ];

    const handleRowClick = (params: GridRowParams<TicketCreateResponse>) => {
        navigate(`/projects/${projectId}/tickets/${params.row.id}`);
    };

    const handleTicketCreate = () => {
        const isValid = validateForm();
        if (isValid) {
            void (async () => {
                try {
                    await createTicket({
                        projectId: projectId!,
                        ...formData,
                    }).unwrap();
                    setOpenForm(false);
                    setErrors({});
                    setFormData(INITIAL_TICKET_DATA);
                } catch {}
            })();
        }
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
                        onRowClick={handleRowClick}
                        sx={{ cursor: 'pointer' }}
                    />
                }
                TitleContent={
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography variant="h2">Project Tickets</Typography>
                        {isAdmin && (
                            <Button
                                variant="contained"
                                startIcon={<Add />}
                                onClick={() => setOpenForm(true)}
                            >
                                Create Ticket
                            </Button>
                        )}
                    </Stack>
                }
            />

            <Dialog
                open={openForm}
                handleClose={() => {
                    setOpenForm(false);
                    setErrors({});
                }}
                title="Create Ticket"
                DialogActionsContent={
                    <>
                        <Button
                            onClick={() => {
                                setOpenForm(false);
                                setErrors({});
                            }}
                            color="inherit"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleTicketCreate}
                            disabled={isCreating}
                        >
                            {isCreating ? 'Creating...' : 'Create'}
                        </Button>
                    </>
                }
                DialogContentData={
                    <Stack spacing={3} width="100%" sx={{ pt: 1 }}>
                        {createError && (
                            <Alert severity="error">
                                {(createError as ApiError)?.data?.detail ||
                                    'Creation failed'}
                            </Alert>
                        )}
                        <TextField
                            fullWidth
                            id="title"
                            name="title"
                            label="Title"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    title: e.target.value,
                                })
                            }
                            error={Boolean(errors.title)}
                            helperText={errors.title}
                        />
                        <TextField
                            fullWidth
                            id="description"
                            name="Description"
                            label="Description"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value,
                                })
                            }
                            error={Boolean(errors.description)}
                            helperText={errors.description}
                        />
                        <TextField
                            select
                            fullWidth
                            label="Select User"
                            value={formData.assignee}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    assignee: e.target.value,
                                })
                            }
                        >
                            {(
                                assignableUsers as {
                                    id: string;
                                    member: UserData;
                                    role: number;
                                }[]
                            )?.map((user) => (
                                <MenuItem
                                    key={user.member.id}
                                    value={user.member.id}
                                >
                                    {user.member.first_name}{' '}
                                    {user.member.last_name} ({user.member.email}
                                    )
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            fullWidth
                            label="Status"
                            value={formData.status}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    status: Number(e.target.value),
                                })
                            }
                            error={Boolean(errors.status)}
                            helperText={errors.status}
                        >
                            {TICKET_STATUS.map((role) => (
                                <MenuItem key={role.value} value={role.value}>
                                    {role.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            fullWidth
                            label="Severity"
                            value={formData.severity}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    severity: Number(e.target.value),
                                })
                            }
                            error={Boolean(errors.severity)}
                            helperText={errors.severity}
                        >
                            {TICKET_SEVERITY.map((role) => (
                                <MenuItem key={role.value} value={role.value}>
                                    {role.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            fullWidth
                            label="Deadline"
                            type="datetime-local"
                            value={formData.deadline}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    deadline: e.target.value,
                                })
                            }
                        />
                    </Stack>
                }
            />
        </Stack>
    );
};
