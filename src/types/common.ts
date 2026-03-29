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
export interface PaginationMeta<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

/** * PAGINATED RESPONSE
 */
export interface PaginatedResponse<T> extends Omit<ApiResponse<T>, 'data'> {
    data: PaginationMeta<T>;
}

/** * ERROR STRUCTURE
 */
export interface ApiError {
    detail?: string;
    code?: string;
    [key: string]: string[] | string | undefined;
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
    can_edit?: boolean;
    jiraID?: string;
    jira_access_token?: string;
}

/** * AUTH & REQUEST INTERFACES
 */
export interface LoginSignupRefreshResponse {
    access: string;
}

export interface UserRegistrationData
    extends Omit<UserData, 'id' | 'can_edit'> {
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
}

export interface UpdateUserData {
    first_name?: string;
    last_name?: string;
    phone?: string | null;
    date_of_birth?: string | null;
    designation?: string | number;
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
    status: number;
    key: string;
    jira_url: string;
    jira_project_id: string;
}

export interface ProjectListResponse extends ProjectCreateResponse {
    project_role: number;
    owner: string;
    created_at: string;
}

export interface ProjectListData {
    limit: number;
    offset: number;
    ordering: string | undefined;
    filter: object | undefined;
}

export interface ProjectMemberData {
    projectId: string;
    limit?: number;
    offset?: number;
    ordering?: string | undefined;
    filter?: object | undefined;
}

export interface ProjectMemberResponse {
    id: string;
    member: UserData;
    role: number;
}

export interface TicketCreateData {
    title: string;
    description: string;
    status: number;
    project_id: string;
    severity: number;
    assignee?: string;
    deadline?: string | null;
}

export interface TicketCreateResponse
    extends Omit<TicketCreateData, 'assignee'> {
    id: string;
    jira_key: string;
    key: string;
    reporter_email: string;
    reporter_name: string;
    assignee_id: string;
    assignee_email: string;
    assignee_name: string;
    is_subscribed: boolean;
    is_active: boolean;
    project: string;
    created_at: string;
}

export interface TicketListData {
    projectId: string;
    limit: number;
    offset: number;
    ordering: string | undefined;
    filter: object | undefined;
}

export interface TicketDeleteData {
    projectId: string;
    ticketId: string;
}

export interface CommentData {
    description: string;
}

export interface CommentResponse {
    id: string;
    description: string;
    author: string;
    author_name: string;
    jira_id: string;
    created_at: string;
    can_edit: boolean;
}

export interface TicketStatusSummary {
    open: number;
    in_progress: number;
    resolved: number;
    closed: number;
}

export interface TicketSeveritySummary {
    lowest: number;
    low: number;
    medium: number;
    high: number;
    highest: number;
}

export interface DeadlineSummaryItem {
    day: string;
    missed: number;
    completed_before_time?: number;
    completed_on_time?: number;
}

export interface UserSummaryParams {
    userId: string;
    section?: 'status' | 'priority' | 'deadline';
    startDate?: string;
    endDate?: string;
}

export interface ProjectSummaryParams {
    projectId: string;
    section?: 'status' | 'priority' | 'deadline';
    userIds?: string[];
    startDate?: string;
    endDate?: string;
}

export interface StatusSummary {
    total: number;
    completed: number;
    missed_deadline: number;
    near_deadline: number;
}

export interface ProjectSummaryResponse {
    ticket_summary?: StatusSummary;
    ticket_status?: TicketStatusSummary;
    ticket_severity?: TicketSeveritySummary;
    deadline_chart?: DeadlineSummaryItem[];
}

export interface JiraTicketOption {
    jira_id: string;
    jira_key: string;
    title: string;
    description: string;
}

export interface PaginatedJiraResponse {
    results: JiraTicketOption[];
    nextPageToken: string | null;
}
