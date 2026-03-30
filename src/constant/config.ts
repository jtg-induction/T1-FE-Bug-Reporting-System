import { AlertColor } from '@mui/material';

export const PROJECT_ROLE_MAP: Record<number, string> = {
    1: 'Developer',
    2: 'Admin',
};

export const ROLE_OWNER = 3;

export const PROJECT_ROLE_OPTIONS = [
    { LABEL: 'Developer', VALUE: 1 },
    { LABEL: 'Admin', VALUE: 2 },
];

export const PROJECT_STATUS_MAP: Record<number, string> = {
    1: 'Archived',
    2: 'Active',
};

export const PROJECT_STATUS_OPTIONS = [
    { LABEL: 'Archived', VALUE: 1 },
    { LABEL: 'Active', VALUE: 2 },
];

export const DESIGNATION_MAP = [
    { value: 'M', label: 'Manager' },
    { value: 'TL', label: 'Team Lead' },
    { value: 'INTERN', label: 'Intern' },
    { value: 'SD', label: 'Software Developer' },
    { value: 'SSD', label: 'Senior Developer' },
];
export const TICKET_SEVERITY_OPTIONS = [
    { LABEL: 'Lowest', VALUE: 1 },
    { LABEL: 'Low', VALUE: 2 },
    { LABEL: 'Mid', VALUE: 3 },
    { LABEL: 'High', VALUE: 4 },
    { LABEL: 'Highest', VALUE: 5 },
];

export const TICKET_STATUS_OPTIONS = [
    { LABEL: 'Open', VALUE: 1 },
    { LABEL: 'In Progress', VALUE: 2 },
    { LABEL: 'Resolved', VALUE: 3 },
    { LABEL: 'Closed', VALUE: 4 },
];

export const TICKET_STATUS_MAP: Record<number, [string, AlertColor]> = {
    1: ['Open', 'info'],
    2: ['In Progress', 'warning'],
    3: ['Resolved', 'success'],
    4: ['Closed', ''],
};

export const TICKET_SEVERITY_MAP: Record<number, [string, AlertColor]> = {
    1: ['Lowest', 'info'],
    2: ['Low', 'info'],
    3: ['Mid', 'warning'],
    4: ['High', 'error'],
    5: ['Highest', 'error'],
};

export const PROJECT_TITLE = 'Bug Reporting System';
