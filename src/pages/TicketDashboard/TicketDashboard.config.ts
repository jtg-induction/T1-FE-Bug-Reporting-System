import { TicketUpdateFormData } from './TicketDashboard.types';

export const INITIAL_EDIT_STATE: TicketUpdateFormData = {
    title: '',
    description: '',
    severity: 1,
    assignee: '',
    deadline: undefined,
};

export const DASHBOARD_TEXT = {
    editTitle: 'Edit Project',
    saveBtn: 'Save Changes',
    cancelBtn: 'Cancel',
    loading: 'Loading...',
    saving: 'Saving...',
};

export const TICKET_SEVERTIY_MAP: Record<
    number,
    [string, 'info' | 'warning' | 'error']
> = {
    1: ['Low', 'info'],
    2: ['Mid', 'warning'],
    3: ['High', 'error'],
};

export const TICKET_STATUS_MAP: Record<
    number,
    [string, 'info' | 'warning' | 'error' | 'success']
> = {
    1: ['Open', 'error'],
    2: ['In Progress', 'warning'],
    3: ['Resolved', 'info'],
    4: ['Closed', 'success'],
};

export const TICKET_STATUS = [
    { value: 1, label: 'Open' },
    { value: 2, label: 'In Progress' },
    { value: 3, label: 'Resolved' },
    { value: 4, label: 'Closed' },
];

export const TICKET_SEVERITY = [
    { value: 1, label: 'Low' },
    { value: 2, label: 'Mid' },
    { value: 3, label: 'High' },
];
