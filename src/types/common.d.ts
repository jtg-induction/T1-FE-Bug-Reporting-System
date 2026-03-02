export interface UserData {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string | null;
    date_of_birth: string | null;
    designation: string | number;
}

export interface UserRegistrationData extends Omit<UserData, 'id'> {
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

export interface UpdateUserData {
    first_name: string;
    last_name: string;
    phone: string | null;
    date_of_birth: string | null;
    designation: string | number;
}

export interface UserProfileData {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    date_of_birth: string;
    designation: string | number;
    is_owner: boolean;
}

export interface ApiResponse {
    status: number;
    data: LoginSignupRefreshResponse | UserData | UserProfileData | void;
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
export interface ProjectCreateData {
    title: string;
    description: string;
    status: number;
    key: string;
    jira_url: string;
}

export interface ProjectCreateResponse {
    id: string;
    title: string;
    description: string;
    status: string | null;
    key: string;
    jira_url: string;
    jira_project_id: string;
}

export interface ProjectListResponse extends ProjectCreateResponse {
    project_role: number;
}
