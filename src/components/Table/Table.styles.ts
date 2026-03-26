import { Box, iconButtonClasses, styled } from '@mui/material';
import { gridClasses } from '@mui/x-data-grid';

export const StyledBox = styled(Box)(
    ({
        theme: {
            palette: { primary },
        },
    }) => ({
        width: '100%',

        [`& .${gridClasses.columnHeader} .${gridClasses.iconButtonContainer}`]:
            {
                visibility: 'visible !important',
                width: 'auto !important',
            },

        [`& .${gridClasses.columnHeader} .${iconButtonClasses.root}`]: {
            opacity: '1 !important',
        },

        [`& .${gridClasses.columnHeader}--sorted .${gridClasses.sortIcon} path`]:
            {
                fill: `${primary.main} !important`,
            },
    }),
);
