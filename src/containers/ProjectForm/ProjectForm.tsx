import { useForm } from 'react-hook-form';
import { showSnackbar } from 'redux/features/profileSlice';
import { useAppDispatch } from 'redux/store';
import { INITIAL_FORM_DATA, ProjectFormValues, projectSchema } from 'schemas';

import { Stack } from '@mui/material';

import { FormField, ModalForm } from '@components';
import { PROJECT_STATUS_OPTIONS } from '@constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateProjectMutation } from '@service';

import { ProjectFormContainerProps } from './ProjectForm.types';

export const ProjectFormContainer = ({
    open,
    onClose,
    onSubmit,
}: ProjectFormContainerProps) => {
    const formId = 'create-project-form';
    const { control, handleSubmit, reset } = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema),
        defaultValues: INITIAL_FORM_DATA,
    });
    const dispatch = useAppDispatch();

    const [createProject, { isLoading: isCreating }] =
        useCreateProjectMutation();

    const handleCreateProject = async (formData: ProjectFormValues) => {
        try {
            await createProject(formData).unwrap();
            onSubmit();
            reset();
        } catch {
            dispatch(
                showSnackbar({
                    message: 'Project Creation Failed',
                    severity: 'error',
                }),
            );
        }
    };

    return (
        <ModalForm
            open={open}
            title="Create Project"
            formId={formId}
            onClose={onClose}
            isLoading={isCreating}
            submitLabel="Create"
        >
            <form
                id={formId}
                onSubmit={(e) => void handleSubmit(handleCreateProject)(e)}
            >
                <Stack spacing={3} mt={1}>
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
                    <FormField
                        name="key"
                        label="Project Key"
                        control={control}
                        editStatus={true}
                    />
                    <FormField
                        name="status"
                        label="Status"
                        type="select"
                        control={control}
                        editStatus={true}
                        options={PROJECT_STATUS_OPTIONS}
                    />
                    <FormField
                        name="jira_url"
                        label="Jira URL"
                        control={control}
                        editStatus={true}
                    />
                </Stack>
            </form>
        </ModalForm>
    );
};
