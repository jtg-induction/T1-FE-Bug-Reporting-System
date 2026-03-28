import { useState } from 'react';

import { useParams } from 'react-router-dom';
import { showSnackbar } from 'redux/features/profileSlice';
import { useAppDispatch } from 'redux/store';
import { UserData } from 'types/common';

import {
    AccessAlarm,
    CheckCircle,
    Delete,
    DriveFileMove,
    Edit,
    NotificationsActive,
    NotificationsNone,
    Person,
    Speed,
} from '@mui/icons-material';
import { Box, Button, Chip, Divider, Stack, Typography } from '@mui/material';

import { ActionMenu } from '@components';
import { TICKET_SEVERITY_MAP, TICKET_STATUS_MAP } from '@constant';
import {
    CommentSectionContainer,
    MoveTicketContainer,
    TicketEditForm,
} from '@containers';
import * as Pages from '@pages';
import {
    useDeleteTicketMutation,
    useGetMeQuery,
    useGetProjectMembersQuery,
    useGetTicketQuery,
    useSubscribeTicketMutation,
    useUnsubscribeTicketMutation,
    useUpdateTicketMutation,
} from '@service';
import { formatDateTime } from '@utils';

import {
    BodyText,
    CommentSection,
    FlexHeader,
    MainLayout,
    MetadataStack,
    MetaItem,
    TicketContentCard,
    TruncatedTitle,
    UserInfo,
} from './TicketDetails.styles';

export const TicketDashboardContainer = () => {
    const { pid: projectId, tid: ticketId } = useParams();
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isStatusOnly, setIsStatusOnly] = useState(false);
    const {
        data: ticket,
        isLoading,
        isError,
    } = useGetTicketQuery({ projectId: projectId!, ticketId: ticketId! });
    const { data: user } = useGetMeQuery();
    const { data: members } = useGetProjectMembersQuery(
        { projectId: projectId! },
        { skip: !projectId },
    );
    const membersData = members?.data.results ?? [];
    const currentUserId = user?.data?.id;
    const [updateTicket] = useUpdateTicketMutation();
    const [deleteTicket] = useDeleteTicketMutation();
    const [subscribe] = useSubscribeTicketMutation();
    const [unsubscribe] = useUnsubscribeTicketMutation();
    const [isMoveOpen, setIsMoveOpen] = useState(false);
    const dispatch = useAppDispatch();

    if (isLoading) return <>Loading...</>;
    if (isError) return <Pages.NotFoundPage />;

    const d = ticket?.data;
    const perm = d?.permission_class;

    const canClose = perm === 4 && d.status === 3;

    const handleOpenEdit = (statusOnly: boolean) => {
        setIsStatusOnly(statusOnly);
        setIsEditOpen(true);
    };

    const handleDelete = async () => {
        try {
            await deleteTicket({
                projectId: projectId,
                ticketId: ticketId,
            }).unwrap();
        } catch {
            dispatch(
                showSnackbar({
                    message: 'Ticket Deletion Failed',
                    severity: 'error',
                }),
            );
        }
    };

    const handleClose = async () => {
        try {
            await updateTicket({
                projectId: projectId!,
                ticketId: ticketId!,
                updateData: { status: 4 },
            }).unwrap();
        } catch {
            dispatch(
                showSnackbar({
                    message: 'Ticket Close Failed',
                    severity: 'error',
                }),
            );
        }
    };

    const menuItems = [];
    if (perm >= 3) {
        menuItems.push(
            {
                id: 'edit',
                label: 'Edit Ticket',
                icon: <Edit />,
                onClick: () => handleOpenEdit(false),
            },
            {
                id: 'delete',
                label: 'Delete Ticket',
                icon: <Delete />,
                onClick: () => handleDelete(),
            },
        );
    } else if (perm === 2) {
        menuItems.push({
            id: 'status',
            label: 'Update Status',
            icon: <Speed />,
            onClick: () => handleOpenEdit(true),
        });
    }
    if (perm === 4) {
        menuItems.push({
            id: 'move',
            label: 'Move Ticket',
            icon: <DriveFileMove />,
            onClick: () => setIsMoveOpen(true),
        });
    }

    return (
        <MainLayout>
            <TicketContentCard>
                <FlexHeader>
                    <Stack>
                        <Typography
                            variant="overline"
                            color="primary"
                            sx={{ lineHeight: 1 }}
                        >
                            {d.key}
                        </Typography>
                        <TruncatedTitle variant="h4">{d.title}</TruncatedTitle>
                    </Stack>

                    {d.is_active && (
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Button
                                size="small"
                                onClick={() =>
                                    void (
                                        d.is_subscribed
                                            ? unsubscribe
                                            : subscribe
                                    )({
                                        projectId: projectId!,
                                        ticketId: ticketId!,
                                    })
                                }
                            >
                                {d.is_subscribed ? (
                                    <NotificationsActive color="warning" />
                                ) : (
                                    <NotificationsNone />
                                )}
                            </Button>

                            <ActionMenu items={menuItems} />
                        </Stack>
                    )}
                </FlexHeader>

                <MetadataStack>
                    <MetaItem>
                        <Typography variant="caption" className="label">
                            Status
                        </Typography>
                        <Chip
                            label={TICKET_STATUS_MAP[d.status][0]}
                            color={TICKET_STATUS_MAP[d.status][1]}
                            size="small"
                        />
                    </MetaItem>

                    <MetaItem>
                        <Typography variant="caption" className="label">
                            Assignee
                        </Typography>
                        <UserInfo>
                            <Person fontSize="inherit" />
                            <Typography variant="body2" noWrap>
                                {d.assignee || 'Unassigned'}
                            </Typography>
                        </UserInfo>
                    </MetaItem>

                    <MetaItem>
                        <Typography variant="caption" className="label">
                            Reporter
                        </Typography>
                        <UserInfo>
                            <Person fontSize="inherit" />
                            <Typography variant="body2" noWrap>
                                {d.reporter}
                            </Typography>
                        </UserInfo>
                    </MetaItem>

                    <MetaItem>
                        <Typography variant="caption" className="label">
                            Severity
                        </Typography>
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.5}
                        >
                            <Speed
                                fontSize="inherit"
                                color={TICKET_SEVERITY_MAP[d.severity][1]}
                            />
                            <Typography
                                color={TICKET_SEVERITY_MAP[d.severity][1]}
                                variant="body2"
                            >
                                {TICKET_SEVERITY_MAP[d.severity][0]}
                            </Typography>
                        </Stack>
                    </MetaItem>

                    <MetaItem>
                        <Typography variant="caption" className="label">
                            Deadline
                        </Typography>
                        <UserInfo>
                            <AccessAlarm fontSize="inherit" />
                            <Typography variant="body2" noWrap>
                                {d.deadline
                                    ? formatDateTime(d.deadline).slice(0, 12)
                                    : 'NA'}
                            </Typography>
                        </UserInfo>
                    </MetaItem>

                    {d.is_active && canClose && (
                        <Button
                            variant="contained"
                            color="success"
                            size="small"
                            startIcon={<CheckCircle />}
                            onClick={() => void handleClose}
                        >
                            Close
                        </Button>
                    )}
                </MetadataStack>

                <Divider />

                <Box>
                    <Typography variant="subtitle2" gutterBottom>
                        Description
                    </Typography>
                    <BodyText variant="body1">{d.description}</BodyText>
                </Box>
            </TicketContentCard>

            <CommentSection>
                <CommentSectionContainer />
            </CommentSection>

            <TicketEditForm
                isStatusOnly={isStatusOnly}
                open={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                ticket={d}
                memberOptions={
                    (
                        membersData as {
                            id: string;
                            member: UserData;
                            role: number;
                        }[]
                    )
                        .filter((m) => m.member.id !== currentUserId)
                        .map((m) => ({
                            LABEL: `${m.member.first_name} ${m.member.last_name} - (${m.member.email})`,
                            VALUE: m.member.id,
                        })) || [{ LABEL: 'No Members to Assign', VALUE: null }]
                }
            />

            <MoveTicketContainer
                open={isMoveOpen}
                onClose={() => setIsMoveOpen(false)}
            />
        </MainLayout>
    );
};
