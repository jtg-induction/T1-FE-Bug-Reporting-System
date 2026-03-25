export const PUBLIC_PATHS = {
    LOGIN: '/login',
    REQUEST_REGISTER: '/signup/request',
    COMPLETE_REGISTER: '/signup/complete',
};

export const PRIVATE_PATHS = {
    DASHBOARD: '/',
    PROFILE: '/profile',
    PROJECTS: '/projects/',
    PROJECT_DASHBOARD: '/projects/:id/:tab?',
    PROJECT_ACCEPT_INVITE: '/projects/:id/accept',
    PROJECT_REJECT_INVITE: '/projects/:id/reject',
    TICKETS: '/tickets',
    TICKET_DASHBOARD: '/projects/:pid/tickets/:tid',
};
