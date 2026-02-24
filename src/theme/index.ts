declare module '@mui/material/styles' {
    interface Theme {
        boxShadow: {
            primary: string;
            secondary: string;
            tertiary: string;
        };

        componentWidth: {
            drawer: number;
        };
    }

    interface ThemeOptions {
        boxShadow?: {
            primary?: string;
            secondary?: string;
            tertiary?: string;
        };

        componentWidth?: {
            drawer?: number;
        };
    }
}

import { createTheme } from '@mui/material/styles';

import { BOXSHADOW, COMPONENTWIDTH, SCALING_FACTOR } from '@constant';

/* Customized MUI components themes */
import { components } from './components';
/* Customized foundation themes */
import { breakpoints, mixins, palette, typography } from './foundations';

/* 
Initialize the theme with base theme elements (excluding typography styles and spacing to ensure the theme has correct breakpoints and pxToRem function set.)
*/
let theme = createTheme({
    palette,
    breakpoints,
    mixins,
    components,
    typography: {
        fontFamily: 'Inter',
        ...typography.typographyUtil,
    },
    spacing: (factor: number) =>
        theme.typography.pxToRem(factor * SCALING_FACTOR),
});

/* Extend the base theme with additional configurations */
theme = createTheme(theme, {
    typography: {
        ...typography.typographyStyle(theme),
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    ...theme.mixins.hideScrollbar(),
                },
            },
        },
    },
    boxShadow: BOXSHADOW,
    componentWidth: COMPONENTWIDTH,
});

export { theme };
