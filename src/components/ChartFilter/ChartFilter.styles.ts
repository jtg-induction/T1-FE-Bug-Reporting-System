import { Box, FormControl, Stack, styled,TextField } from '@mui/material';

export const FilterWrapper = styled(Stack)(
    ({
        theme: {
            typography: { pxToRem },
            breakpoints,
        },
    }) => ({
        flexDirection: 'column',
        gap: pxToRem(16),
        [breakpoints.up('lg')]: {
            flexDirection: 'row',
            alignItems: 'center',
        },
    }),
);

export const SelectGroup = styled(Stack)(
    ({
        theme: {
            typography: { pxToRem },
            breakpoints,
        },
    }) => ({
        flexDirection: 'column',
        gap: pxToRem(16),
        [breakpoints.up('md')]: {
            flexDirection: 'row',
        },
    }),
);

export const DateInputGroup = styled(Stack)(
    ({
        theme: {
            typography: { pxToRem },
            breakpoints,
        },
    }) => ({
        flexDirection: 'column',
        gap: pxToRem(16),
        [breakpoints.up('md')]: {
            flexDirection: 'row',
        },
    }),
);

export const FilterFormControl = styled(FormControl)(
    ({
        theme: {
            typography: { pxToRem },
        },
    }) => ({
        width: '100%',
        minWidth: pxToRem(200),
        maxWidth: pxToRem(300),
    }),
);

export const FilterDateInput = styled(TextField)(
    ({
        theme: {
            typography: { pxToRem },
        },
    }) => ({
        width: pxToRem(200),
    }),
);

export const MenuItemContent = styled(Box)(
    ({
        theme: {
            typography: { pxToRem },
        },
    }) => ({
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        gap: pxToRem(8),
    }),
);

export const SCROLLABLE_MENU_PROPS = {
    PaperProps: {
        style: {
            maxHeight: 250,
            width: 250,
        },
    },
};
