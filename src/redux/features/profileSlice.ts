import { AlertColor } from '@mui/material';

import { ProfileFormValues } from '@containers/ProfileForm/ProfileForm.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
    editStatus: boolean;
    formData: ProfileFormValues | null;
    snackbar: {
        open: boolean;
        message: string;
        severity: AlertColor;
        actionLabel?: string;
        actionUrl?: string;
    };
    isSubmitting: boolean;
    isFormDirty: boolean;
    isCancelling: boolean;
}

const initialState: ProfileState = {
    editStatus: false,
    formData: null,
    snackbar: {
        open: false,
        message: '',
        severity: 'success',
        actionLabel: undefined,
        actionUrl: undefined,
    },
    isSubmitting: false,
    isFormDirty: false,
    isCancelling: false,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setEditStatus: (state, action: PayloadAction<boolean>) => {
            state.editStatus = action.payload;
        },
        updateFormData: (state, action: PayloadAction<ProfileFormValues>) => {
            state.formData = action.payload;
        },
        resetProfileState: (state) => {
            state.editStatus = false;
        },
        showSnackbar: (
            state,
            action: PayloadAction<{
                message: string;
                severity: AlertColor;
                actionLabel?: string;
                actionUrl?: string;
            }>,
        ) => {
            state.snackbar = { open: true, ...action.payload };
        },
        hideSnackbar: (state) => {
            state.snackbar.open = false;
            state.snackbar.actionLabel = undefined;
            state.snackbar.actionUrl = undefined;
        },
        triggerSubmit: (state) => {
            state.isSubmitting = true;
        },
        resetSubmitTrigger: (state) => {
            state.isSubmitting = false;
        },
        setFormDirty: (state, action: PayloadAction<boolean>) => {
            state.isFormDirty = action.payload;
        },
        triggerCancel: (state) => {
            state.isCancelling = true;
            state.editStatus = false;
        },
        resetCancelTrigger: (state) => {
            state.isCancelling = false;
        },
    },
});

export const {
    setEditStatus,
    updateFormData,
    resetProfileState,
    showSnackbar,
    hideSnackbar,
    triggerSubmit,
    resetSubmitTrigger,
    setFormDirty,
    resetCancelTrigger,
    triggerCancel,
} = profileSlice.actions;
export default profileSlice.reducer;
