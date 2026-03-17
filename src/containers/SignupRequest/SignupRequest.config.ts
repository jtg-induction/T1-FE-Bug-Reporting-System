import { PUBLIC_PATHS } from '@constant';

export const SIGNUP_CONFIG = {
    TITLE: 'Create an Account',
    REDIRECT_TEXT: 'Already have an account? Sign in',
    REDIRECT_PATH: PUBLIC_PATHS.LOGIN,
    STATUS: {
        LOADING: 'Sending...',
        IDLE: 'Send Invite',
    },
    COPY: {
        SUCCESS_TITLE: 'Check your inbox',
        SUCCESS_BODY:
            "We've sent an invitation link to your email. Please click the link to complete your registration.",
        SPAM_WARNING: "Don't see it? Be sure to check your spam folder.",
        ERROR_DEFAULT: 'Failed to send invite',
    },
};
