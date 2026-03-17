import { PUBLIC_PATHS } from '@constant';

export const LOGIN_PAGE_CONFIG = {
    TITLE: 'Welcome Back',
    REDIRECT_TEXT: "Don't have an account? Sign up",
    REDIRECT_PATH: PUBLIC_PATHS.REQUEST_REGISTER,
    STATUS: {
        LOADING: 'Signing In...',
        IDLE: 'Sign In',
    },
    MESSAGE: {
        PASSWORD_REQUIRED: 'Password is required',
    },
};
