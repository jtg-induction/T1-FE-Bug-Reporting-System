export interface LoginResponse {
    access: string;
}

export interface SendInviteResponse {
    message: string;
}

export interface RegistrationFormData {
    first_name: string;
    last_name: string;
    email: string;
    token: string;
    date_of_birth: string | null;
    phone: string | null;
    designation: string | number;
    jiraID: string;
    password: string;
    confirm_password: string;
}
