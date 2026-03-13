import { alpha, Box, Stack, styled, Typography } from '@mui/material';
import { filledInputClasses } from '@mui/material/FilledInput';
import { inputBaseClasses } from '@mui/material/InputBase';
import { inputLabelClasses } from '@mui/material/InputLabel';
import { textFieldClasses } from '@mui/material/TextField';

export const SectionLabel = styled(Typography)(
    ({
        theme: {
            typography: { pxToRem },
            palette: { text },
        },
    }) => ({
        fontSize: pxToRem(16),
        fontWeight: 800,
        color: text.primary,
        marginBottom: pxToRem(32),
    }),
);

export const StyledSection = styled(Box)(
    ({
        theme: {
            typography: { pxToRem },
            breakpoints,
            boxShadow,
            palette: { common, divider },
        },
    }) => ({
        padding: pxToRem(16),
        backgroundColor: common.white,
        borderRadius: 24,
        border: `1px solid ${alpha(divider, 0.1)}`,
        boxShadow: boxShadow.secondary,
        [breakpoints.up('md')]: {
            padding: pxToRem(24),
        },
    }),
);

export const FormGridStack = styled(Stack)(
    ({
        theme: {
            typography: { pxToRem },
            palette: { text, common, primary, grey },
            spacing,
        },
    }) => ({
        [`& .${textFieldClasses.root}`]: {
            width: '100%',
            [`& .${inputLabelClasses.root}`]: {
                fontWeight: 700,
                fontSize: pxToRem(16),
                color: text.secondary,
                [`&.${inputLabelClasses.focused}`]: {
                    color: primary.main,
                },
                [`&.${inputLabelClasses.shrink}`]: {
                    transform: `translate(${pxToRem(16)}, ${pxToRem(-8)}) scale(0.8)`,
                    backgroundColor: common.white,
                    padding: 0,
                },
            },
            [`& .${inputBaseClasses.root}`]: {
                borderRadius: 16,
                minHeight: pxToRem(64),
                fontSize: pxToRem(16),
            },
            [`& .${filledInputClasses.root}`]: {
                backgroundColor: grey[100],
                '&:before, &:after': { display: 'none' },

                [`& .${inputBaseClasses.input}`]: {
                    padding: spacing(2, 4),
                },
                [`&.${inputBaseClasses.multiline}`]: {
                    padding: 0,
                },
            },
        },
    }),
);
