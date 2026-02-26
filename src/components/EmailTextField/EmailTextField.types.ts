export interface EmailTextFieldProps {
    value: string;
    onChange: (value: string) => void;
    error: string;
    setError: (error: string) => void;
}
