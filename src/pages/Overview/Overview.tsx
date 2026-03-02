import { useState } from 'react';

import {
    useCreateProjectMutation,
    useGetMeQuery,
    useGetProjectsQuery,
} from 'redux/apiSlice';
import { ProjectListResponse } from 'types/common';

import { Add } from '@mui/icons-material';
import {
    Alert,
    Button,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

import { Dialog } from '@components/Dialog';
import { SectionCard } from '@components/SectionCard';
import { Table } from '@components/Table';

import {
    CREATE_PROJECT,
    INITIAL_FORM_DATA,
    PROJECT_STATUS,
    USER_PROJECT_ROLE,
} from './Overview.config';
import {
    DialogActionProps,
    DialogContentProps,
    TitleContentProps,
} from './Overview.types';

export const Overview = () => {
    const { data: currentUser } = useGetMeQuery();
    const [createProject, { error: createError, isLoading: creatingProject }] =
        useCreateProjectMutation();
    const { data, isLoading: isLoadingProjects } = useGetProjectsQuery();
    const columns: GridColDef<ProjectListResponse>[] = [
        {
            field: 'id',
            headerName: 'ID',
            renderCell: (params) =>
                params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
        },
        {
            field: 'key',
            headerName: 'Project Key',
            flex: 1,
        },
        {
            field: 'title',
            headerName: 'Project TItle',
            flex: 1,
        },
        {
            field: 'project_role',
            headerName: 'Role',
            flex: 1,
            renderCell: (params) => USER_PROJECT_ROLE[params.row.project_role],
        },
    ];

    const [openForm, setOpenForm] = useState(false);

    const handleFormOpen = () => {
        setOpenForm(true);
    };

    const handleClose = () => {
        setOpenForm(false);
    };

    const handleSubmit = async (e?: React.SyntheticEvent) => {
        if (e) {
            e.preventDefault();
        }

        const isValid = validateForm();
        if (isValid) {
            const submitData = {
                title: formData.title,
                description: formData.description,
                key: formData.key,
                jira_url: formData.jira_url,
                status: formData.status,
            };
            await createProject(submitData).unwrap();
            setOpenForm(false);
            setFormData(INITIAL_FORM_DATA);
        }
    };

    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const handleChange =
        (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({
                ...formData,
                [field]:
                    field === 'status'
                        ? Number(e.target.value)
                        : e.target.value,
            });
            if (errors[field]) {
                setErrors({ ...errors, [field]: '' });
            }
        };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        } else if (formData.title.trim().length < 2) {
            newErrors.title = 'Title cannot be a single character';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        } else if (formData.description.trim().length < 2) {
            newErrors.description = 'Description cannot be a single character';
        }

        if (!formData.key.trim()) {
            newErrors.key = 'Key is required';
        } else if (formData.key.trim().length < 2) {
            newErrors.key = 'Key cannot be a single character';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <Stack component="section" padding={4} gap={4}>
            <Stack>
                <Typography variant="h2" component="h1">
                    Dashboard
                </Typography>
                <Typography>
                    Welcome back, {currentUser?.first_name}! Here's what's
                    happening in your projects
                </Typography>
            </Stack>
            <SectionCard
                MainContent={
                    <Table
                        loading={isLoadingProjects}
                        rows={data ?? []}
                        columns={columns}
                        pageSize={5}
                    />
                }
                TitleContent={<TitleContent handleFormOpen={handleFormOpen} />}
            />
            <Dialog
                open={openForm}
                handleClose={handleClose}
                title="Create a Project"
                DialogActionsContent={
                    <DialogActions
                        creatingProject={creatingProject}
                        handleCancel={handleClose}
                        handleCreate={handleSubmit}
                    />
                }
                DialogContentData={
                    <DialogContent
                        handleChange={handleChange}
                        createError={createError}
                        formData={formData}
                        errors={errors}
                    />
                }
            />
        </Stack>
    );
};

const TitleContent = ({ handleFormOpen }: TitleContentProps) => (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h2">Your Projects</Typography>
        <Button color="inherit" onClick={handleFormOpen} variant="contained">
            <Add />
            Create Project
        </Button>
    </Stack>
);

const DialogActions = ({
    creatingProject,
    handleCancel,
    handleCreate,
}: DialogActionProps) => (
    <>
        <Button onClick={handleCancel} color="inherit" variant="contained">
            Cancel
        </Button>
        <Button
            onClick={() => void handleCreate()}
            color="inherit"
            variant="contained"
        >
            {creatingProject ? 'Creating...' : 'Create'}
        </Button>
    </>
);

const DialogContent = ({
    createError,
    formData,
    handleChange,
    errors,
}: DialogContentProps) => (
    <Stack spacing={2} width="100%">
        {createError ? (
            <Alert severity="error">
                {typeof createError === 'string'
                    ? createError
                    : CREATE_PROJECT.messages.defaultError}
            </Alert>
        ) : null}

        <Stack spacing={2}>
            <TextField
                fullWidth
                id="title"
                name="title"
                label="Title"
                variant="outlined"
                autoComplete="given-name"
                value={formData.title}
                onChange={handleChange('title')}
                error={Boolean(errors.title)}
                helperText={errors.title}
            />
            <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                variant="outlined"
                autoComplete="family-name"
                value={formData.description}
                onChange={handleChange('description')}
                error={Boolean(errors.description)}
                helperText={errors.description}
            />

            <TextField
                fullWidth
                id="key"
                name="key"
                label="Project Key"
                variant="outlined"
                value={formData.key}
                onChange={handleChange('key')}
                error={Boolean(errors.key)}
                helperText={errors.key}
            />
            <TextField
                fullWidth
                select
                id="Status"
                name="status"
                label="Status"
                variant="outlined"
                value={formData.status}
                onChange={handleChange('status')}
                error={Boolean(errors.status)}
                helperText={errors.status}
            >
                {PROJECT_STATUS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                fullWidth
                id="jira_url"
                name="jira_url"
                label="Jira URL"
                type="text"
                variant="outlined"
                value={formData.jira_url}
                onChange={handleChange('jira_url')}
                error={Boolean(errors.jira_url)}
                helperText={errors.jira_url}
            />
        </Stack>
    </Stack>
);
