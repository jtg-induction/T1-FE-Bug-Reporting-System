import { Control } from 'react-hook-form';
import { ProjectFormValues } from 'schemas';

import { Stack } from '@mui/material';

import { FormField } from '@components/FormField';
import { PROJECT_STATUS_OPTIONS } from '@constant';

export const ProjectFields = ({
    control,
}: {
    control: Control<ProjectFormValues>;
}) => (
    <Stack spacing={3} sx={{ mt: 1 }}>
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
);
