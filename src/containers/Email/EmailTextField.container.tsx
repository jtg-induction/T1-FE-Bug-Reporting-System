import { TextField } from '@mui/material';

import { EmailTextFieldProps } from './EmailTextField.types';

export const validateEmail = (value: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
        return 'Email is required';
    } else if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
    }
    return '';
};

export const EmailTextField = ({
    value,
    onChange,
    error,
    setError,
}: EmailTextFieldProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        onChange(newValue);
        if (error) {
            setError(validateEmail(newValue));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setError(validateEmail(e.target.value));
    };

    return (
        <TextField
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            type="email"
            variant="outlined"
            autoComplete="email"
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(error)}
            helperText={error}
        />
    );
};
