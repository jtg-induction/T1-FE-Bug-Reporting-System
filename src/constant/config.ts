import { AlertColor } from '@mui/material';

export const PROJECT_ROLE_MAP: Record<number, string> = {
    0: 'Developer',
    1: 'Admin',
};

export const ROLE_OWNER = 2;

export const PROJECT_STATUS_OPTIONS = [
    { LABEL: 'Archived', VALUE: 0 },
    { LABEL: 'Active', VALUE: 1 },
];

export const DESIGNATION_MAP = [
    { value: 'M', label: 'Manager' },
    { value: 'TL', label: 'Team Lead' },
    { value: 'INTERN', label: 'Intern' },
    { value: 'SD', label: 'Software Developer' },
    { value: 'SSD', label: 'Senior Developer' },
];
export const TICKET_SEVERITY_OPTIONS = [
    { LABEL: 'Low', VALUE: 1 },
    { LABEL: 'Mid', VALUE: 2 },
    { LABEL: 'High', VALUE: 3 },
];

export const TICKET_STATUS_OPTIONS = [
    { LABEL: 'Open', VALUE: 1 },
    { LABEL: 'In Progress', VALUE: 2 },
    { LABEL: 'Resolved', VALUE: 3 },
    { LABEL: 'Closed', VALUE: 4 },
];

export const TICKET_STATUS_MAP: Record<number, [string, AlertColor]> = {
    1: ['Open', 'error'],
    2: ['In Progress', 'warning'],
    3: ['Resolved', 'info'],
    4: ['Closed', 'success'],
};

export const TICKET_SEVERITY_MAP: Record<number, [string, AlertColor]> = {
    1: ['Low', 'info'],
    2: ['Mid', 'warning'],
    3: ['High', 'error'],
};
