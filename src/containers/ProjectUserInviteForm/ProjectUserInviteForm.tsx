import { useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { Alert, Stack } from '@mui/material';

import { FormField, ModalForm } from '@components';

import {
    ProjectUserInviteFormData,
    ProjectUserInviteFormProps,
} from './ProjectUserInviteForm.types';

export const ProjectUserInviteFormContainer = ({
    open,
    onClose,
    onSubmit,
    isLoading,
    errorMessage,
    userOptions,
    roleOptions,
}: ProjectUserInviteFormProps) => {
    const formId = 'invite-member-form';

    const { control, handleSubmit, reset } = useForm<ProjectUserInviteFormData>(
        {
            defaultValues: { user_id: '', role: 0 },
        },
    );

    useEffect(() => {
        if (!open) {
            reset({ user_id: '', role: 0 });
        }
    }, [open, reset]);

    const handleFormSubmit = async (data: ProjectUserInviteFormData) => {
        await onSubmit(data);
    };

    return (
        <ModalForm
            open={open}
            title="Invite Member"
            formId={formId}
            onClose={onClose}
            isLoading={isLoading}
            submitLabel="Invite"
        >
            {userOptions.length > 0 ? (
                <form
                    id={formId}
                    onSubmit={(e) => void handleSubmit(handleFormSubmit)(e)}
                >
                    <Stack spacing={3}>
                        {errorMessage && (
                            <Alert severity="error">{errorMessage}</Alert>
                        )}

                        <FormField
                            name="user_id"
                            label="Select User"
                            type="select"
                            control={control}
                            editStatus={true}
                            options={userOptions}
                        />

                        <FormField
                            name="role"
                            label="Role"
                            type="select"
                            control={control}
                            editStatus={true}
                            options={roleOptions}
                        />
                    </Stack>
                </form>
            ) : (
                <>No Other Users to Invite</>
            )}
        </ModalForm>
    );
};
