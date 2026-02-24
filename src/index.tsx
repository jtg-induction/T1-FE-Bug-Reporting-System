import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from "react-redux";
import { RouterProvider } from "routes";

import { CssBaseline } from '@mui/material';

import { ThemeProvider } from '@emotion/react';

import { store } from "./redux/store";
import { theme } from "./theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
