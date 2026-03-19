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

    const isSelect = type === 'select';
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
            value={displayValue}
            fullWidth
            label={label}
            variant={inputVariant}
            select={isSelect && editStatus}
            error={!!error}
            helperText={error?.message}
            slotProps={{
                input: { readOnly: !editStatus },
                inputLabel: { shrink: type === 'date' || !!field.value },
            }}
            type={type === 'date' ? 'date' : type}
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
