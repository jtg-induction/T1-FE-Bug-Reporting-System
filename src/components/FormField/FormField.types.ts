import { Control, FieldValues, Path } from 'react-hook-form';

import { TextFieldProps } from '@mui/material';

export interface FormFieldProps<T extends FieldValues>
    extends Omit<TextFieldProps, 'name'> {
    name: Path<T>;
    control: Control<T>;
    editStatus: boolean;
    options?: { LABEL: string; VALUE: string | number }[];
}
