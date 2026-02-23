import { SignupFormData } from './SignupComplete.types';

export const DESIGNATIONS = [
    { value: 'INTERN', label: 'Intern' },
    { value: 'SD', label: 'SD' },
    { value: 'SSD', label: 'SSD' },
    { value: 'TL', label: 'TL' },
    { value: 'M', label: 'Manager' },
];

export const INITIAL_FORM_DATA: SignupFormData = {
    first_name: '',
    last_name: '',
    date_of_birth: '',
    phone: '',
    designation: '',
    jiraID: '',
    password: '',
    confirmPassword: '',
};

export const VALIDATION_REGEX = {
    phone: /^[0-9]{10,15}$/,
    jira: /^[a-zA-Z0-9-]+$/,
};

export const SIGNUP_COMPLETE = {
    title: 'Complete Registration',
    status: {
        registering: 'Creating Account...',
        idle: 'Create Account',
    },
    messages: {
        loadingText: 'Verifying your secure link...',
        invalidTitle: 'Invalid Link',
        invalidBody:
            'The registration link you clicked is not valid. This usually happens if the link has been modified or already used.',
        invalidButton: 'Request a New Invite',
        defaultError:
            'Registration failed. Please check your details and try again.',
    },
    routes: {
        requestInvite: '/signup/request',
        loginSuccess: '/login?registered=true',
    },
};
