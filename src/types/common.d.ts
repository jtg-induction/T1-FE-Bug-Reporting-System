export interface UserData {
    first_name: string;
    last_name: string;
    email: string;
    phone: string | null;
    date_of_birth: string | null;
    designation: string | number;
}

export interface UserRegistrationData extends UserData {
    jiraID: string;
    jira_access_token: string;
    password: string;
    confirm_password: string;
}

export interface LoginSignupRefreshResponse {
    access: string;
    user: UserData;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface SendVerifyLinkData {
    email: string;
}

export interface VerifyLinkData {
    email: string;
    token: string;
}
