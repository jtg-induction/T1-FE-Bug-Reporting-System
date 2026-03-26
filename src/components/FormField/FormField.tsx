import { useState } from 'react';

import { FieldValues, useController } from 'react-hook-form';

import { MenuItem, TextField } from '@mui/material';

import { FormFieldProps } from './FormField.types';

export const FormField = <T extends FieldValues>({
    name,
    control,
    editStatus,
    options,
    label,
    type,
    ...rest
}: FormFieldProps<T>) => {
    const {
        field,
        fieldState: { error },
    } = useController({ name, control });

    const [isFocused, setIsFocused] = useState(false);

    const isSelect = type === 'select';
    const isDate = type === 'date';
    const inputVariant = editStatus ? 'outlined' : 'filled';

    const displayValue =
        !editStatus && isSelect
            ? options?.find((opt) => opt.VALUE === field.value)?.LABEL ||
              field.value
            : field.value;

    return (
        <TextField
            {...field}
            {...rest}
            value={displayValue ?? ''}
            fullWidth
            label={label}
            variant={inputVariant}
            select={isSelect && editStatus}
            error={!!error}
            helperText={error?.message}
            type={
                isDate ? (isFocused || !!field.value ? 'date' : 'text') : type
            }
            onFocus={() => {
                setIsFocused(true);
                field.onBlur();
            }}
            onBlur={() => {
                setIsFocused(false);
                field.onBlur();
            }}
            slotProps={{
                input: {
                    readOnly: !editStatus,
                },
                inputLabel: {
                    shrink: !!field.value || isFocused || isSelect,
                },
            }}
        >
            {isSelect &&
                editStatus &&
                options?.map((option) => (
                    <MenuItem key={option.VALUE} value={option.VALUE}>
                        {option.LABEL}
                    </MenuItem>
                ))}
        </TextField>
    );
};
