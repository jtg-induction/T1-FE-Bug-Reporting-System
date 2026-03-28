import { formatDateTime } from 'utils/formatDatetime';

import { AccessAlarm } from '@mui/icons-material';
import { Avatar, Typography } from '@mui/material';

import { TICKET_STATUS_MAP } from '@constant';

import {
    AssigneeInfo,
    AssigneeName,
    DeadlineInfo,
    MetaFooter,
    StatusBadge,
    StyledTicketCard,
    TitleText,
    TopRow,
} from './TicketCard.styles';
import { TicketCardProps } from './TicketCard.types';

export const TicketCard = ({ ticket, onClick }: TicketCardProps) => (
    <StyledTicketCard onClick={() => onClick(ticket.project_id, ticket.id)}>
        <TopRow>
            <StatusBadge>{TICKET_STATUS_MAP[ticket.status][0]}</StatusBadge>
            <Typography
                variant="caption"
                color="text.disabled"
                sx={{ fontWeight: 700 }}
            >
                {ticket.jira_key}
            </Typography>
        </TopRow>

        <TitleText variant="body1">{ticket.title}</TitleText>

        <MetaFooter>
            <DeadlineInfo>
                <AccessAlarm color="error" />
                <Typography color="error" className="text">
                    {formatDateTime(ticket.deadline).slice(0, 12)}
                </Typography>
            </DeadlineInfo>

            <AssigneeInfo>
                <Avatar
                    sx={{
                        width: 20,
                        height: 20,
                        fontSize: 10,
                        bgcolor: 'primary.main',
                    }}
                >
                    {ticket.assignee?.charAt(0).toUpperCase()}
                </Avatar>
                <AssigneeName color="text.primary">
                    {ticket.assignee ? ticket.assignee : 'N/A'}
                </AssigneeName>
            </AssigneeInfo>
        </MetaFooter>
    </StyledTicketCard>
);
