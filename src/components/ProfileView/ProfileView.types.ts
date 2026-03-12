import { UseFormReturn } from 'react-hook-form';
import { profileSchema } from 'schemas';
import { z } from 'zod';

import { AlertColor } from '@mui/material';

export type ProfileFormValues = z.infer<typeof profileSchema>;

export interface ProfileViewProps {
    form: UseFormReturn<ProfileFormValues>;
    editStatus: boolean;
    setEditStatus: (val: boolean) => void;
    isUpdatingUser: boolean;
    isEditable: boolean;
    onSave: (e: React.BaseSyntheticEvent) => Promise<void>;
    onCancel: () => void;
    snackbar: { open: boolean; message: string; severity: AlertColor };
    onSnackbarClose: () => void;
    displayEmail: string;
}
