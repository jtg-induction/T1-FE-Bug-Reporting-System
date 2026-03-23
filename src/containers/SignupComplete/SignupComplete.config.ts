import { PUBLIC_PATHS } from '@constant';

import { SignupFormData } from './SignupComplete.types';

export const DESIGNATIONS = [
    { VALUE: 'INTERN', LABEL: 'Intern' },
    { VALUE: 'SD', LABEL: 'Software Developer' },
    { VALUE: 'SSD', LABEL: 'Senior Software Developer' },
    { VALUE: 'TL', LABEL: 'Team Lead' },
    { VALUE: 'M', LABEL: 'Manager' },
];

export const INITIAL_FORM_DATA: SignupFormData = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phone: '',
    designation: '',
    jiraId: '',
    password: '',
    confirmPassword: '',
    jiraAccessToken: '',
};

export const SIGNUP_COMPLETE = {
    TITLE: 'Complete Registration',
    STATUS: {
        REGISTERING: 'Creating Account...',
        IDLE: 'Create Account',
    },
    MESSAGES: {
        LOADING_TEXT: 'Verifying your secure link...',
        INVALID_TITLE: 'Invalid Link',
        INVALID_BODY:
            'The registration link you clicked is not valid. This usually happens if the link has been modified or already used.',
        INVALID_BUTTON: 'Request a New Invite',
        DEFAULT_ERROR:
            'Registration failed. Please check your details and try again.',
    },
    ROUTES: {
        REQUEST_INVITE: PUBLIC_PATHS.REQUEST_REGISTER,
        LOGIN_SUCCESS: '/',
    },
};
