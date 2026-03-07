/**
 * Represents the state of the signup/email verification process.
 * @interface SignupState
 * @property {string} email - The user's input email address.
 * @property {string | null} emailError - Holds a validation error message if the email is invalid.
 * @property {boolean} isSent - A flag indicating whether the verification email or signup
 */
export interface SignupState {
    email: string;
    emailError: string | null;
    isSent: boolean;
}
