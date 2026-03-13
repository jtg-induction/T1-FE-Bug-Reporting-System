import { Popover, styled } from '@mui/material';
import { popoverClasses } from '@mui/material/Popover';

export const StyledPopover = styled(Popover)(
    ({
        theme: {
            typography: { pxToRem },
        },
    }) => ({
        [`& .${popoverClasses.paper}`]: {
            padding: pxToRem(30),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: pxToRem(10),
        },
    }),
);
