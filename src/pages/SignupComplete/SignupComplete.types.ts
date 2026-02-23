export type TokenStatus = 'loading' | 'valid' | 'invalid';

export interface SignupFormData {
    first_name: string;
    last_name: string;
    date_of_birth: string;
    phone: string;
    designation: string | number;
    jiraID: string;
    password: string;
    confirmPassword: string;
}
