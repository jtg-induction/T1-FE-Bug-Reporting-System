export const PROTECTED_ROUTE_CONFIG = {
    endpoints: {
        refresh: 'http://localhost:8000/api/refresh/',
    },
    messages: {
        loading: 'Loading session...',
        refreshError: 'Silent refresh failed:',
    },
    routes: {
        login: '/login',
    },
};
