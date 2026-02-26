import { ProjectCreateData } from 'types/common';

export const INITIAL_FORM_DATA: ProjectCreateData = {
    title: '',
    description: '',
    key: '',
    jira_url: '',
    status: '',
};

export const VALIDATION_REGEX = {
    jira: /^[a-zA-Z0-9-]+$/,
};

export const USER_PROJECT_ROLE: Record<number, string> = {
    0: 'Developer',
    1: 'Admin',
};

export const PROJECT_STATUS = [
    { value: 0, label: 'Archived' },
    { value: 1, label: 'Active' },
];

export const CREATE_PROJECT = {
    messages: {
        defaultError:
            'Creation failed. Please check your details and try again.',
    },
};
