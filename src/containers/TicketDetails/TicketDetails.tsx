import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { UserData } from 'types/common';

import { CheckCircle, DriveFileMove, Edit, NotificationsActive, NotificationsNone, Person, Speed } from '@mui/icons-material';
import { Box, Button, Chip, Divider, Stack, Typography } from '@mui/material';

import { ActionMenu } from '@components';
import { PRIVATE_PATHS, TICKET_STATUS_MAP } from '@constant';
import { MoveTicketContainer, TicketEditForm } from '@containers';
import { TicketFormValues } from '@schemas';
import { useGetProjectMembersQuery, useGetTicketQuery, useSubscribeTicketMutation, useUnsubscribeTicketMutation, useUpdateTicketMutation } from '@service';

import { ActivityPlaceholder, BodyText, CommentSection, FlexHeader, MainLayout, MetadataStack, MetaItem, TicketContentCard, TruncatedTitle, UserInfo } from './TicketDetails.styles';

export const TicketDashboardContainer = () => {
    const { pid: projectId, tid: ticketId } = useParams();
    const navigate = useNavigate();
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isStatusOnly, setIsStatusOnly] = useState(false);
    const { data: ticket, isLoading } = useGetTicketQuery({ projectId: projectId!, ticketId: ticketId! });

    const { data: members } = useGetProjectMembersQuery({ projectId: projectId! }, { skip: !projectId });
    const membersData = members?.data ?? [];
    const [updateTicket, { isLoading: isUpdating }] = useUpdateTicketMutation();
    const [subscribe] = useSubscribeTicketMutation();
    const [unsubscribe] = useUnsubscribeTicketMutation();
    const [isMoveOpen, setIsMoveOpen] = useState(false);

    if (isLoading || !ticket?.data) return null;

    const d = ticket.data;
    const perm = d.permission_class;

    const canClose = perm === 4 && d.status === 3;

    const handleUpdate = async (updateData: TicketFormValues) => {
        try {
            await updateTicket({
                projectId: projectId!,
                ticketId: ticketId!,
                updateData
            }).unwrap();
            setIsEditOpen(false);
        } catch {
        }
    };

    const handleMoveTicket = async (newProjectId: string) => {
        try {
            await updateTicket({
                projectId: projectId!,
                ticketId: ticketId!,
                updateData: {
                    project_id: newProjectId
                }
            }).unwrap();

            setIsMoveOpen(false);
            navigate(`${PRIVATE_PATHS.PROJECTS}/${newProjectId}${PRIVATE_PATHS.TICKETS}/${ticketId}`);
        } catch {
        }
    };

    const handleOpenEdit = (statusOnly: boolean) => {
        setIsStatusOnly(statusOnly);
        setIsEditOpen(true);
    };

    const menuItems = [];
    if (perm >= 3) {
        menuItems.push({
            id: 'edit',
            label: 'Edit Ticket',
            icon: <Edit />,
            onClick: () => handleOpenEdit(false)
        });
    } else if (perm === 2) {
        menuItems.push({
            id: 'status',
            label: 'Update Status',
            icon: <Speed />,
            onClick: () => handleOpenEdit(true)
        });
    } if (perm === 4) {
        menuItems.push({
            id: 'move',
            label: 'Move Project',
            icon: <DriveFileMove />,
            onClick: () => setIsMoveOpen(true)

        })
    }

    return (
        <MainLayout>
            <TicketContentCard>
                <FlexHeader>
                    <Stack>
                        <Typography variant="overline" color="primary" sx={{ lineHeight: 1 }}>
                            {d.key}
                        </Typography>
                        <TruncatedTitle variant="h4">{d.title}</TruncatedTitle>
                    </Stack>

                    {d.is_active && (<Stack direction="row" spacing={1} alignItems="center">
                        <Button
                            size="small"
                            onClick={() => void (d.is_subscribed ? unsubscribe : subscribe)({ projectId: projectId!, ticketId: ticketId! })}
                        >
                            {d.is_subscribed ? <NotificationsActive color="warning" /> : <NotificationsNone />}
                        </Button>

                        <ActionMenu items={menuItems} />
                    </Stack>)}
                </FlexHeader>

                <MetadataStack>
                    <MetaItem>
                        <Typography variant="caption" className="label">Status</Typography>
                        <Chip
                            label={TICKET_STATUS_MAP[d.status][0]}
                            color={TICKET_STATUS_MAP[d.status][1]}
                            size="small"
                        />
                    </MetaItem>

                    <MetaItem>
                        <Typography variant="caption" className="label">Assignee</Typography>
                        <UserInfo>
                            <Person fontSize="inherit" />
                            <Typography variant="body2" noWrap>{d.assignee || 'Unassigned'}</Typography>
                        </UserInfo>
                    </MetaItem>

                    <MetaItem>
                        <Typography variant="caption" className="label">Reporter</Typography>
                        <UserInfo>
                            <Typography variant="body2" noWrap>{d.reporter}</Typography>
                        </UserInfo>
                    </MetaItem>

                    <MetaItem>
                        <Typography variant="caption" className="label">Severity</Typography>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                            <Speed fontSize="inherit" color="action" />
                            <Typography variant="body2">High</Typography>
                        </Stack>
                    </MetaItem>

                    {d.is_active && canClose && (
                        <Button
                            variant="contained"
                            color="success"
                            size="small"
                            startIcon={<CheckCircle />}
                            onClick={() => void updateTicket({ projectId: projectId!, ticketId: ticketId!, updateData: { status: 4 } })}
                        >
                            Close
                        </Button>
                    )}
                </MetadataStack>

                <Divider />

                <Box>
                    <Typography variant="subtitle2" gutterBottom>Description</Typography>
                    <BodyText variant="body1">{d.description}</BodyText>
                </Box>
            </TicketContentCard>

            <CommentSection>
                <Typography variant="h6">Activity</Typography>
                <ActivityPlaceholder>
                    Comments Container goes here...
                </ActivityPlaceholder>
            </CommentSection>


            <TicketEditForm
                isStatusOnly={isStatusOnly}
                open={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                ticket={d}
                isLoading={isUpdating}
                onUpdate={handleUpdate}
                memberOptions={(membersData as { id: string, member: UserData, role: number }[]).map(m => ({
                    LABEL: `${m.member.first_name} ${m.member.last_name} - (${m.member.email})`,
                    VALUE: m.member.id
                })) || []}
            />

            <MoveTicketContainer
                open={isMoveOpen}
                onClose={() => setIsMoveOpen(false)}
                onMove={handleMoveTicket}
                isLoading={isUpdating}
            />

        </MainLayout>
    );
};