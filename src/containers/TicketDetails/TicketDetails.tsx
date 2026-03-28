import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { showSnackbar } from 'redux/features/profileSlice';
import { useAppDispatch } from 'redux/store';
import { UserData } from 'types/common';

import {
    AccessAlarm,
    Delete,
    DriveFileMove,
    Edit,
    NotificationsActive,
    NotificationsNone,
    Person,
    Speed,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Chip,
    Divider,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material';

import { ActionMenu } from '@components';
import {
    PROJECT_TITLE,
    TICKET_SEVERITY_MAP,
    TICKET_STATUS_MAP,
} from '@constant';
import {
    CommentSectionContainer,
    MoveTicketContainer,
    TicketEditForm,
} from '@containers';
import { StyledShowMoreButton } from '@containers/ProjectDetail/ProjectDetail.styles';
import * as Pages from '@pages';
import {
    useDeleteTicketMutation,
    useGetMeQuery,
    useGetProjectMembersQuery,
    useGetTicketQuery,
    useSubscribeTicketMutation,
    useUnsubscribeTicketMutation,
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
    TitleWrapper,
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
    const [deleteTicket] = useDeleteTicketMutation();
    const [subscribe] = useSubscribeTicketMutation();
    const [unsubscribe] = useUnsubscribeTicketMutation();
    const [isMoveOpen, setIsMoveOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const dispatch = useAppDispatch();

    const d = ticket?.data;

    useEffect(() => {
        document.title = d ? `Ticket: ${d.jira_key}` : PROJECT_TITLE;

        return () => {
            document.title = PROJECT_TITLE;
        };
    }, [d]);

    if (isLoading) return <>Loading...</>;
    if (isError) return <Pages.NotFoundPage />;

    const perm = d?.permission_class;
    const isActive = d?.is_active;
    const isLongDescription = d?.description.length > 150;

    const handleOpenEdit = (statusOnly: boolean) => {
        setIsStatusOnly(statusOnly);
        setIsEditOpen(true);
    };

    const handleDelete = async () => {
        try {
            await deleteTicket({
                projectId: projectId!,
                ticketId: ticketId!,
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

    const menuItems = [
        {
            id: 'edit',
            label: 'Edit Ticket',
            icon: <Edit />,
            onClick: () => handleOpenEdit(false),
            display: Boolean((perm ?? 0) >= 3),
        },
        {
            id: 'delete',
            label: 'Delete Ticket',
            icon: <Delete />,
            onClick: () => handleDelete(),
            display: Boolean((perm ?? 0) >= 3),
        },
        {
            id: 'status',
            label: 'Update Status',
            icon: <Speed />,
            onClick: () => handleOpenEdit(true),
            display: perm === 2,
        },
        {
            id: 'move',
            label: 'Move Ticket',
            icon: <DriveFileMove />,
            onClick: () => setIsMoveOpen(true),
            display: perm === 4,
        },
    ];

    return (
        <MainLayout>
            <TicketContentCard>
                <FlexHeader>
                    <TitleWrapper>
                        <Typography
                            variant="overline"
                            color="primary"
                            sx={{ lineHeight: 1 }}
                        >
                            {d?.key}
                        </Typography>
                        <TruncatedTitle variant="h4" noWrap title={d?.title}>
                            {d?.title}
                        </TruncatedTitle>
                    </TitleWrapper>

                    {d?.is_active && (
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Button
                                size="small"
                                onClick={() =>
                                    void (
                                        d?.is_subscribed
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
                            <Tooltip title={d?.assignee_email || 'Unassigned'}>
                                <Typography
                                    variant="body2"
                                    noWrap
                                    overflow={'hidden'}
                                    textOverflow={'ellipsis'}
                                >
                                    {d?.assignee_name || 'Unassigned'}
                                </Typography>
                            </Tooltip>
                        </UserInfo>
                    </MetaItem>

                    <MetaItem>
                        <Typography variant="caption" className="label">
                            Reporter
                        </Typography>
                        <UserInfo>
                            <Person fontSize="inherit" />
                            <Tooltip title={d?.reporter_email}>
                                <Typography
                                    variant="body2"
                                    noWrap
                                    overflow={'hidden'}
                                    textOverflow={'ellipsis'}
                                >
                                    {d?.reporter_name}
                                </Typography>
                            </Tooltip>
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
                                color={
                                    d?.severity
                                        ? TICKET_SEVERITY_MAP[d.severity][1]
                                        : 'primary'
                                }
                            />
                            <Typography
                                color={
                                    d?.severity
                                        ? TICKET_SEVERITY_MAP[d.severity][1]
                                        : 'primary'
                                }
                                variant="body2"
                            >
                                {d?.severity &&
                                    TICKET_SEVERITY_MAP[d.severity][0]}
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
                </MetadataStack>

                <Divider />

                <Box>
                    <Typography variant="subtitle2" gutterBottom>
                        Description
                    </Typography>
                    <BodyText variant="body1" isExpanded={isExpanded}>
                        {d?.description}
                    </BodyText>
                    {isLongDescription && (
                        <StyledShowMoreButton
                            size="small"
                            onClick={() => setIsExpanded(!isExpanded)}
                            disableRipple
                        >
                            {isExpanded ? 'Show less' : 'Show more'}
                        </StyledShowMoreButton>
                    )}
                </Box>
            </TicketContentCard>

            <CommentSection>
                <CommentSectionContainer isActive={isActive} />
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
