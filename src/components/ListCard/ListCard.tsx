import { ListItemText, Typography } from '@mui/material';

import { StyledListItem } from './ListCard.styles';
import { ListCardProps } from './ListCard.types';

export const ListCard = ({ title, Info, handleOnClick }: ListCardProps) => (
    <StyledListItem
        onClick={handleOnClick}
        sx={{ cursor: handleOnClick ? 'pointer' : 'default' }}
    >
        <ListItemText
            primary={
                <Typography
                    variant="body1"
                    fontWeight="600"
                    color="text.primary"
                >
                    {title}
                </Typography>
            }
            secondary={<>{Info}</>}
        />
    </StyledListItem>
);
