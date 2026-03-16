import { useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { Stack } from '@mui/material';

import { FormField, ModalForm } from '@components';
import { ProjectUpdateFormData } from '@containers';

import { EditProjectFormContainerProps } from './EditProjectForm.types';

export const EditProjectFormContainer = ({
    open,
    onClose,
    onSubmit,
    isLoading,
    initialData,
}: EditProjectFormContainerProps) => {
    const formId = 'edit-project-form';

    const { control, handleSubmit, reset } = useForm<ProjectUpdateFormData>({
        defaultValues: initialData,
    });
    useEffect(() => {
        if (open) {
            reset(initialData);
        }
    }, [open, initialData, reset]);

    const handleFormSubmit = async (data: ProjectUpdateFormData) => {
        await onSubmit(data);
    };

    return (
        <ModalForm
            open={open}
            title="Edit Project"
            formId={formId}
            onClose={onClose}
            isLoading={isLoading}
            submitLabel="Save Changes"
        >
            <form
                id={formId}
                onSubmit={(e) => void handleSubmit(handleFormSubmit)(e)}
            >
                <Stack spacing={3}>
                    <FormField
                        name="title"
                        label="Title"
                        control={control}
                        editStatus={true}
                    />
                    <FormField
                        name="description"
                        label="Description"
                        control={control}
                        editStatus={true}
                        multiline
                        rows={3}
                    />
                </Stack>
            </form>
        </ModalForm>
    );
};
