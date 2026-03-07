/**
 * The complete data structure required for a user registration request.
 * @interface SignupFormData
 * @property {string} first_name - The user's given name.
 * @property {string} last_name - The user's family name.
 * @property {string} date_of_birth - User's birth date (typically in ISO 8601 or YYYY-MM-DD format).
 * @property {string} phone - Contact phone number including country code.
 * @property {string | number} designation - Professional title or internal role ID.
 * @property {string} jiraID - The unique identifier or username for the user's Jira account.
 * @property {string} password - The chosen secret password for the new account.
 * @property {string} confirmPassword - A secondary field used to verify password matching on the client side.
 * @property {string} jira_access_token - The API token used to authenticate with Jira services.
 */

export interface SignupFormData {
    first_name: string;
    last_name: string;
    date_of_birth: string;
    phone: string;
    designation: string | number;
    jiraID: string;
    password: string;
    confirmPassword: string;
    jira_access_token: string;
}
