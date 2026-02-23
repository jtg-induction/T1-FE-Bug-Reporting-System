export const SIGNUP_CONFIG = {
    title: 'Create an Account',
    redirectText: 'Already have an account? Sign in',
    redirectPath: '/login',
    status: {
        loading: 'Sending...',
        idle: 'Send Invite',
    },
    copy: {
        successTitle: 'Check your inbox',
        successBody:
            "We've sent an invitation link to your email. Please click the link to complete your registration.",
        spamWarning: "Don't see it? Be sure to check your spam folder.",
        errorDefault: 'Failed to send invite',
    },
};
