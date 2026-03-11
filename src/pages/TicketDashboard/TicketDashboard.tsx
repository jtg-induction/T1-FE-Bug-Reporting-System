import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import {
    useDeleteTicketMutation,
    useGetProjectMembersQuery,
    useGetTicketQuery,
    useSubscribeTicketMutation,
    useUnsubscribeTicketMutation,
    useUpdateTicketMutation,
} from 'redux/apiSlice';
import { UserData } from 'types/common';

import {
    CheckCircle,
    Delete,
    Edit,
    MoveUp,
    NotificationsActive,
    NotificationsOff,
    Update,
} from '@mui/icons-material';
import {
    Button,
    Chip,
    Menu,
    MenuItem,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';

import { Dialog } from '@components/Dialog';

import {
    DASHBOARD_TEXT,
    INITIAL_EDIT_STATE,
    TICKET_SEVERITY,
    TICKET_SEVERTIY_MAP,
    TICKET_STATUS,
    TICKET_STATUS_MAP,
} from './TicketDashboard.config';
import {
    StyledDashboardContainer,
    StyledDetailsCard,
    StyledDialogContentWrapper,
    StyledHeaderSection,
    StyledInfoRow,
    StyledInfoWrapper,
    StyledLabel,
} from './TicketDashboard.styles';
import {
    EditDialogActionsProps,
    TicketUpdateFormData,
} from './TicketDashboard.types';

const DUMMY_PROJECTS = [
    { id: 'proj-1', name: 'Alpha Initiative' },
    { id: 'proj-2', name: 'Beta Internal Tools' },
    { id: 'proj-3', name: 'Customer Support Portal' },
];

export const TicketDashboard = () => {
    const { pid: projectId, tid: ticketId } = useParams<{
        pid: string;
        tid: string;
    }>();
    const navigate = useNavigate();

    const {
        data: ticket,
        isLoading,
        error,
    } = useGetTicketQuery(
        { projectId: projectId!, ticketId: ticketId! },
        { skip: !projectId || !ticketId },
    );

    const { data: assignableUsers } = useGetProjectMembersQuery(
        { projectId: projectId! },
        { skip: !projectId },
    );

    const [deleteTicket] = useDeleteTicketMutation();
    const [updateTicket, { isLoading: isUpdating }] = useUpdateTicketMutation();
    const [subscribeTicket] = useSubscribeTicketMutation();
    const [unsubscribeTicket] = useUnsubscribeTicketMutation();
    // const [moveTicket, { isLoading: isMoving }] = useMoveTicketMutation(); // Future implementation

    const [openEdit, setOpenEdit] = useState(false);
    const [openMove, setOpenMove] = useState(false);
    const [targetProjectId, setTargetProjectId] = useState('');
    const [formData, setFormData] =
        useState<TicketUpdateFormData>(INITIAL_EDIT_STATE);
    const [statusAnchor, setStatusAnchor] = useState<null | HTMLElement>(null);

    if (isLoading || !ticket) {
        return (
            <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                {DASHBOARD_TEXT.loading}
            </Typography>
        );
    }

    if (!isLoading && error) {
        return navigate('/tickets');
    }

    const perm = ticket.permission_class;
    const isSubscribed = ticket.is_subscribed;

    const handleOpenEdit = () => {
        setFormData({
            title: ticket.title,
            description: ticket.description,
            severity: ticket.severity,
            status: ticket.status,
            assignee: ticket.assignee,
            deadline: ticket.deadline ? ticket.deadline.substring(0, 16) : '',
        });
        setOpenEdit(true);
    };

    const handleUpdate = async (
        manualUpdate?: Partial<TicketUpdateFormData>,
    ) => {
        let updateData: Partial<TicketUpdateFormData> = {};

        if (manualUpdate) {
            updateData = manualUpdate;
        } else {
            (
                Object.keys(formData) as Array<keyof TicketUpdateFormData>
            ).forEach((key) => {
                const newValue = formData[key];
                const oldValue = ticket[key as keyof typeof ticket];

                if (key === 'deadline') {
                    const formattedOld = oldValue
                        ? (oldValue as string).substring(0, 16)
                        : '';
                    const formattedNew = newValue || '';

                    if (formattedOld !== newValue) {
                        updateData[key] =
                            formattedNew === '' ? null : formattedNew;
                    }
                } else if (newValue !== oldValue) {
                    updateData[key] = newValue;
                }
            });
        }

        if (Object.keys(updateData).length === 0) {
            setOpenEdit(false);
            return;
        }

        try {
            await updateTicket({
                projectId: projectId!,
                ticketId: ticketId!,
                updateData,
            }).unwrap();
            setOpenEdit(false);
            setStatusAnchor(null);
        } catch {}
    };

    const handleMoveTicket = () => {
        if (!targetProjectId) return;
        // try {
        // Replace this with your actual move mutation when ready
        // console.log(`Moving ticket ${ticketId} to project ${targetProjectId}`);
        // await moveTicket({ ticketId, sourceProjectId: projectId, targetProjectId }).unwrap();

        setOpenMove(false);
        navigate(`/projects/${targetProjectId}/`); // Navigate to the new project's dashboard
        // } catch (error) {
        // console.error("Failed to move ticket", error);
        // }
    };

    const handleSubscribeToggle = async () => {
        try {
            if (isSubscribed) {
                await unsubscribeTicket({
                    projectId: projectId!,
                    ticketId: ticketId!,
                }).unwrap();
            } else {
                await subscribeTicket({
                    projectId: projectId!,
                    ticketId: ticketId!,
                }).unwrap();
            }
        } catch {}
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this ticket?'))
            return;
        try {
            await deleteTicket({
                projectId: projectId!,
                ticketId: ticketId!,
            }).unwrap();
            navigate(`/projects/${projectId}/`);
        } catch {}
    };

    return (
        <StyledDashboardContainer>
            <StyledHeaderSection>
                <Typography variant="h6" fontWeight="bold">
                    Ticket: {ticket.title}
                </Typography>

                {ticket.is_active && (
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                        <Tooltip
                            title={isSubscribed ? 'Unsubscribe' : 'Subscribe'}
                        >
                            <Button
                                variant="contained"
                                color="warning"
                                onClick={() => void handleSubscribeToggle}
                            >
                                {isSubscribed ? (
                                    <NotificationsOff />
                                ) : (
                                    <NotificationsActive />
                                )}
                            </Button>
                        </Tooltip>

                        {perm === 2 && (
                            <>
                                <Tooltip title="Update Status">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={(e) =>
                                            setStatusAnchor(e.currentTarget)
                                        }
                                    >
                                        <Update />
                                    </Button>
                                </Tooltip>
                                <Menu
                                    anchorEl={statusAnchor}
                                    open={Boolean(statusAnchor)}
                                    onClose={() => setStatusAnchor(null)}
                                >
                                    {TICKET_STATUS.filter(
                                        (s) => s.value !== 4,
                                    ).map((s) => (
                                        <MenuItem
                                            key={s.value}
                                            onClick={() =>
                                                void handleUpdate({
                                                    status: s.value,
                                                })
                                            }
                                        >
                                            {s.label}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </>
                        )}

                        {perm >= 3 && (
                            <>
                                <Tooltip title="Move Ticket">
                                    <Button
                                        variant="contained"
                                        color="info"
                                        onClick={() => setOpenMove(true)}
                                    >
                                        <MoveUp />
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Edit Ticket">
                                    <Button
                                        variant="contained"
                                        onClick={handleOpenEdit}
                                    >
                                        <Edit />
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Delete Ticket">
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => void handleDelete()}
                                    >
                                        <Delete />
                                    </Button>
                                </Tooltip>
                            </>
                        )}

                        {perm === 4 && ticket.status === 3 && (
                            <Tooltip title="Close Ticket">
                                <Button
                                    variant="contained"
                                    sx={{
                                        bgcolor: 'success.main',
                                        '&:hover': { bgcolor: 'success.dark' },
                                    }}
                                    onClick={() =>
                                        void handleUpdate({ status: 4 })
                                    }
                                >
                                    <CheckCircle />
                                </Button>
                            </Tooltip>
                        )}
                    </Stack>
                )}
            </StyledHeaderSection>

            <StyledDetailsCard>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                >
                    {ticket.description}
                </Typography>

                <StyledInfoWrapper>
                    <StyledInfoRow>
                        <StyledLabel>Status:</StyledLabel>
                        <Chip
                            label={
                                TICKET_STATUS_MAP[ticket.status]?.[0] ||
                                'Unknown'
                            }
                            color={
                                TICKET_STATUS_MAP[ticket.status]?.[1] ||
                                'default'
                            }
                            size="small"
                        />
                    </StyledInfoRow>
                    <StyledInfoRow>
                        <StyledLabel>Severity:</StyledLabel>
                        <Chip
                            label={
                                TICKET_SEVERTIY_MAP[ticket.severity]?.[0] ||
                                'Unknown'
                            }
                            color={
                                TICKET_SEVERTIY_MAP[ticket.severity]?.[1] ||
                                'default'
                            }
                            size="small"
                        />
                    </StyledInfoRow>
                    <StyledInfoRow>
                        <StyledLabel>Reporter:</StyledLabel>
                        <Typography variant="body2">
                            {ticket.reporter}
                        </Typography>
                    </StyledInfoRow>
                    <StyledInfoRow>
                        <StyledLabel>Jira ID:</StyledLabel>
                        <Typography variant="body2">
                            {ticket.jira_id || 'N/A'}
                        </Typography>
                    </StyledInfoRow>
                    <StyledInfoRow>
                        <StyledLabel>Deadline:</StyledLabel>
                        <Typography variant="body2">
                            {ticket.deadline
                                ? new Date(ticket.deadline).toLocaleString()
                                : 'Not Defined'}
                        </Typography>
                    </StyledInfoRow>
                </StyledInfoWrapper>
            </StyledDetailsCard>

            {/* Edit Ticket Dialog */}
            <Dialog
                open={openEdit}
                handleClose={() => setOpenEdit(false)}
                title={DASHBOARD_TEXT.editTitle}
                DialogContentData={
                    <EditDialogContent
                        formData={formData}
                        handleFieldChange={(f, v) =>
                            setFormData((prev) => ({ ...prev, [f]: v }))
                        }
                        assignableUsers={
                            assignableUsers as {
                                id: string;
                                member: UserData;
                                role: number;
                            }[]
                        }
                        canClose={perm === 5}
                    />
                }
                DialogActionsContent={
                    <EditDialogActions
                        isUpdating={isUpdating}
                        onCancel={() => setOpenEdit(false)}
                        onSave={() => void handleUpdate()}
                    />
                }
            />

            {/* Move Ticket Dialog */}
            <Dialog
                open={openMove}
                handleClose={() => setOpenMove(false)}
                title="Move Ticket to Another Project"
                DialogContentData={
                    <StyledDialogContentWrapper>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            Select the target project where you want to move
                            this ticket.
                        </Typography>
                        <TextField
                            select
                            fullWidth
                            label="Target Project"
                            value={targetProjectId}
                            onChange={(e) => setTargetProjectId(e.target.value)}
                        >
                            {DUMMY_PROJECTS.filter(
                                (p) => p.id !== projectId,
                            ).map((project) => (
                                <MenuItem key={project.id} value={project.id}>
                                    {project.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </StyledDialogContentWrapper>
                }
                DialogActionsContent={
                    <>
                        <Button
                            onClick={() => setOpenMove(false)}
                            color="inherit"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="info"
                            onClick={() => void handleMoveTicket}
                            disabled={!targetProjectId}
                        >
                            Move Ticket
                        </Button>
                    </>
                }
            />
        </StyledDashboardContainer>
    );
};

interface EditContentProps {
    formData: TicketUpdateFormData;
    handleFieldChange: (
        field: keyof TicketUpdateFormData,
        value: string | number,
    ) => void;
    assignableUsers:
        | { id: string; member: UserData; role: number }[]
        | undefined;
    canClose: boolean;
}

const EditDialogContent = ({
    formData,
    handleFieldChange,
    assignableUsers,
    canClose,
}: EditContentProps) => (
    <StyledDialogContentWrapper>
        <TextField
            fullWidth
            label="Title"
            value={formData.title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
        />
        <TextField
            fullWidth
            multiline
            rows={3}
            label="Description"
            value={formData.description}
            onChange={(e) => handleFieldChange('description', e.target.value)}
        />
        <TextField
            select
            fullWidth
            label="Status"
            value={formData.status}
            onChange={(e) =>
                handleFieldChange('status', e.target.value as number)
            }
        >
            {TICKET_STATUS.filter((s) => canClose || s.value !== 4).map((s) => (
                <MenuItem key={s.value} value={s.value}>
                    {s.label}
                </MenuItem>
            ))}
        </TextField>
        <TextField
            select
            fullWidth
            label="Assignee"
            value={formData.assignee || ''}
            onChange={(e) => handleFieldChange('assignee', e.target.value)}
        >
            {assignableUsers?.map((user) => (
                <MenuItem key={user.member.id} value={user.member.id}>
                    {user.member.first_name} {user.member.last_name} (
                    {user.member.email})
                </MenuItem>
            ))}
        </TextField>
        <TextField
            select
            fullWidth
            label="Severity"
            value={formData.severity}
            onChange={(e) =>
                handleFieldChange('severity', e.target.value as number)
            }
        >
            {TICKET_SEVERITY.map((s) => (
                <MenuItem key={s.value} value={s.value}>
                    {s.label}
                </MenuItem>
            ))}
        </TextField>
        <TextField
            fullWidth
            label="Deadline"
            type="datetime-local"
            slotProps={{ inputLabel: { shrink: true } }}
            value={formData.deadline}
            onChange={(e) => handleFieldChange('deadline', e.target.value)}
        />
    </StyledDialogContentWrapper>
);

const EditDialogActions = ({
    isUpdating,
    onCancel,
    onSave,
}: EditDialogActionsProps) => (
    <>
        <Button onClick={onCancel} color="inherit">
            Cancel
        </Button>
        <Button variant="contained" onClick={onSave} disabled={isUpdating}>
            {isUpdating ? 'Saving...' : 'Save Changes'}
        </Button>
    </>
);
