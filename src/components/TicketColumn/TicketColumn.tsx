import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
    Button,
    Chip,
    CircularProgress,
    Stack,
    Typography,
} from '@mui/material';

import { TicketCard } from '@components/TicketCard';
import { PRIVATE_PATHS } from '@constant';
import { useGetUserTicketsQuery } from '@service';

import {
    StyledColumnHeader,
    StyledColumnWrapper,
    StyledTicketStack,
} from './TicketColumn.styles';
import { BoardColumn } from './TicketColumn.types';

const PAGE_SIZE = 3;

export const TicketColumn = ({ column }: { column: BoardColumn }) => {
    const [offset, setOffset] = useState(0);
    const navigate = useNavigate();

    const { data, isFetching } = useGetUserTicketsQuery({
        limit: PAGE_SIZE,
        offset: offset,
        filter: { status: column.id },
        ordering: undefined,
    });

    const tickets = data?.data.results ?? [];
    const totalCount = data?.data.count ?? 0;

    const hasMore = tickets.length < totalCount;

    const handleLoadMore = () => {
        setOffset((prev) => prev + PAGE_SIZE);
    };

    return (
        <StyledColumnWrapper>
            <StyledColumnHeader>
                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    width="100%"
                    justifyContent="space-between"
                >
                    <Typography
                        variant="h3"
                        fontWeight="bold"
                        color="text.secondary"
                    >
                        {column.label}
                    </Typography>
                    <Chip size="small" label={totalCount} />
                </Stack>
            </StyledColumnHeader>

            <StyledTicketStack>
                {tickets.map((ticket) => (
                    <TicketCard
                        key={ticket.id}
                        ticket={ticket}
                        onClick={() =>
                            void navigate(
                                `${PRIVATE_PATHS.PROJECTS}/${ticket.project_id}${PRIVATE_PATHS.TICKETS}/${ticket.id}`,
                            )
                        }
                        hideDeadline={column.label === 'DONE'}
                    />
                ))}

                {hasMore && (
                    <Button
                        fullWidth
                        onClick={handleLoadMore}
                        disabled={isFetching}
                        sx={{ mt: 1, py: 1 }}
                    >
                        {isFetching ? (
                            <CircularProgress size={20} />
                        ) : (
                            'Load More'
                        )}
                    </Button>
                )}
            </StyledTicketStack>
        </StyledColumnWrapper>
    );
};
