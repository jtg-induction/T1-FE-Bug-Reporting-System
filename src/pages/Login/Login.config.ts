import { publicPaths } from '@constant';

export const LOGIN_PAGE_CONFIG = {
    title: 'Welcome Back',
    redirectText: "Don't have an account? Sign up",
    redirectPath: publicPaths.requestRegister,
    status: {
        loading: 'Signing In...',
        idle: 'Sign In',
    },
    messages: {
        passwordRequired: 'Password is required',
    },
};
