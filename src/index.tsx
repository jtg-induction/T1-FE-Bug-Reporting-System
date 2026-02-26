import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import { store } from 'redux/store';
import { RouterProvider } from 'routes';
import { theme } from 'theme';

import { CssBaseline } from '@mui/material';

import { ThemeProvider } from '@emotion/react';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <RouterProvider />
            </ThemeProvider>
        </Provider>
    </StrictMode>,
);
