import { TicketColumn } from '@components';

import { COLUMNS } from './TicketBoard.config';
import { StyledBoardContainer } from './TicketBoard.styles';

export const TicketBoard = () => (
    <StyledBoardContainer>
        {COLUMNS.map((column) => (
            <TicketColumn key={column.id} column={column} />
        ))}
    </StyledBoardContainer>
);
