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

export interface GenerateEmailLinkData {
    email: string;
}

export interface VerifyLinkData {
    email: string;
    token: string;
}

export interface ApiResponse {
    status: number;
    data: LoginSignupRefreshResponse | UserData | void;
    message?: string;
}

export interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    meta: PaginationMeta;
}

export interface ApiError {
    message: string;
    errors?: Record<string, string[]>;
    code?: string;
}
