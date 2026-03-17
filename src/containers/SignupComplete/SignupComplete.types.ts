import z from 'zod';

import { signupSchema } from '@schemas';

/**
 * The complete data structure required for a user registration request.
 * @interface SignupFormData
 * @property {string} firstName - The user's given name.
 * @property {string} lastName - The user's family name.
 * @property {string} dateOfBirth - User's birth date (typically in ISO 8601 or YYYY-MM-DD format).
 * @property {string} phone - Contact phone number including country code.
 * @property {string | number} designation - Professional title or internal role ID.
 * @property {string} jiraID - The unique identifier or username for the user's Jira account.
 * @property {string} password - The chosen secret password for the new account.
 * @property {string} confirmPassword - A secondary field used to verify password matching on the client side.
 * @property {string} jiraAccessToken - The API token used to authenticate with Jira services.
 */

export interface SignupFormData {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phone: string;
    designation: string | number;
    jiraId: string;
    password: string;
    confirmPassword: string;
    jiraAccessToken: string;
}

export type SignupFormValues = z.infer<typeof signupSchema>;
