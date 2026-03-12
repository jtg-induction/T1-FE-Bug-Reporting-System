/** * STANDARDIZED API RESPONSE
 */
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T | null;
    errors: ApiError | null;
}

/** * LIMIT-OFFSET PAGINATION METADATA
 */
export interface PaginationMeta {
    count: number;
    next: string | null;
    previous: string | null;
    limit: number;
    offset: number;
}

/** * PAGINATED RESPONSE
 * Matches the 'metadata' key we used in StandardResultsSetPagination
 */
export interface PaginatedResponse<T> {
    success: boolean;
    message: string;
    metadata: PaginationMeta;
    data: T[];
    errors: null;
}

/** * ERROR STRUCTURE
 */
export interface ApiError {
    detail?: string;
    code?: string;
    [key: string]: string[] | string;
}

/** * BASE INTERFACES
 */
export interface UserData {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string | null;
    date_of_birth: string | null;
    designation: string;
}

export interface UserProfileData extends UserData {
    is_owner: boolean;
}

/** * AUTH & REQUEST INTERFACES
 */
export interface LoginSignupRefreshResponse {
    access: string;
}

export interface UserRegistrationData extends Omit<UserData, 'id'> {
    jiraID: string;
    jira_access_token: string;
    password: string;
    confirm_password: string;
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

export interface UpdateUserData {
    first_name: string;
    last_name: string;
    phone: string | null;
    date_of_birth: string | null | undefined;
    designation: string | number;
}
