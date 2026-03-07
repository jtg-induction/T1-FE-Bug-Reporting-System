/**
 * Props for the EmailTextField component.
 * @interface EmailTextFieldProps
 * @property {string} value - The current string value of the email input field.
 * @property {function(string): void} onChange - Callback function triggered when the input value changes.
 * @property {string} error - The current error message to display. An empty string typically indicates no error.
 * @property {function(string): void} setError - State setter function to manually update or clear the error message
 */
export interface EmailTextFieldProps {
    value: string;
    onChange: (value: string) => void;
    error: string;
    setError: (error: string) => void;
}
