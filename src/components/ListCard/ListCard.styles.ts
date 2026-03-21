import { alpha, ListItem, styled } from '@mui/material';

export const StyledListItem = styled(ListItem)(
    ({
        theme: {
            palette: { primary, secondary },
            spacing,
        },
    }) => ({
        padding: spacing(1, 2),
        borderRadius: 2,
        transition: '0.2s',
        '&:nth-of-type(odd)': {
            backgroundColor: alpha(primary.main, 0.05),
        },
        '&:hover': {
            backgroundColor: alpha(secondary.dark, 0.08),
        },
    }),
);
