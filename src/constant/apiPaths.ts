export const API_PATHS = {
    LOGIN: '/login/',
    REFRESH: '/refresh/',
    LOGOUT: '/logout/',
    REGISTER: '/register/',
    ME: '/users/',
    GENERATE_EMAIL_LINK: '/generate-email-link/',
    VERIFY_LINK: '/verify-link/',
};

export const PUBLIC_MUTATIONS: string[] = [
    'login',
    'signup',
    'generateEmailLink',
];
