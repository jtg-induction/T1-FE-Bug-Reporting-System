import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { RouterProvider } from 'routes';

import { CssBaseline } from '@mui/material';

import { ThemeProvider } from '@emotion/react';

import { theme } from './theme';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider />
        </ThemeProvider>
    </StrictMode>,
);
