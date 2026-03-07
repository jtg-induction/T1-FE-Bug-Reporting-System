import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import {
    useArchiveProjectMutation,
    useChangeRoleMutation,
    useGetMeQuery,
    useGetProjectMembersQuery,
    useGetProjectQuery,
    useRevokeMemberMutation,
    useUnarchiveProjectMutation,
    useUpdateProjectMutation,
} from 'redux/apiSlice';

import ArchiveIcon from '@mui/icons-material/Archive';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import {
    Box,
    Button,
    Chip,
    MenuItem,
    Stack,
    Tabs,
    TextField,
    Typography,
} from '@mui/material';

import { Dialog } from '@components/Dialog';

import { ProjectUsers } from './component/UserTable/UserTable';
import { DASHBOARD_TEXT, INITIAL_EDIT_STATE } from './ProjectDashboard.config';
import {
    StyledDashboardContainer,
    StyledDetailsCard,
    StyledDialogContentWrapper,
    StyledHeaderSection,
    StyledInfoRow,
    StyledInfoWrapper,
    StyledLabel,
    StyledLink,
    StyledTab,
    StyledTabPanel,
    StyledTabsWrapper,
} from './ProjectDashboard.styles';
import {
    EditDialogActionsProps,
    ProjectUpdateFormData,
} from './ProjectDashboard.types';

export const ProjectDashboard = () => {
    const { id: projectId } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [tabValue, setTabValue] = useState(0);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });
    const [filterModel, setFilterModel] = useState({});
    const [sortModel, setSortModel] = useState<string>()
    const { data: currentUser } = useGetMeQuery();
    const { data: project, isLoading } = useGetProjectQuery(
        projectId as string,
        { skip: !projectId },
    );
    const { data: members } = useGetProjectMembersQuery({ projectId: projectId, limit: paginationModel.pageSize, offset: paginationModel.pageSize*paginationModel.page, ordering: sortModel, filter: filterModel }, {
        skip: !projectId,
    });

    const [updateProject, { isLoading: isUpdating }] =
        useUpdateProjectMutation();
    const [archiveProject, { isLoading: isArchiving }] =
        useArchiveProjectMutation();
    const [unarchiveProject, { isLoading: isUnarchiving }] =
        useUnarchiveProjectMutation();

    const [revokeMember, { isLoading: isRevoking }] = useRevokeMemberMutation();
    const [changeRole, { isLoading: isTransferring }] = useChangeRoleMutation();
    const isLeaving = isRevoking || isTransferring;

    const [openEdit, setOpenEdit] = useState(false);
    const [openLeaveDialog, setOpenLeaveDialog] = useState(false);
    const [newOwnerId, setNewOwnerId] = useState('');
    const [formData, setFormData] =
        useState<ProjectUpdateFormData>(INITIAL_EDIT_STATE);

    const handleOpenEdit = () => {
        if (project) {
            setFormData({
                title: project.title,
                description: project.description,
                status: project.status,
            });
        }
        setOpenEdit(true);
    };

    if (isLoading || !project) {
        return (
            <Typography variant="h6" align="center">
                {DASHBOARD_TEXT.loading}
            </Typography>
        );
    }

    const isAdmin = project.project_role === 1;
    const isActive = project.status === 1;
    const isOwner = project.owner === currentUser?.id;

    const handleUpdate = () => {
        void (async () => {
            try {
                await updateProject({
                    projectId: projectId!,
                    updateData: formData,
                }).unwrap();
                setOpenEdit(false);
            } catch { }
        })();
    };

    const handleArchiveToggle = () => {
        void (async () => {
            const actionText = isActive ? 'archive' : 'unarchive';
            if (
                window.confirm(
                    `Are you sure you want to ${actionText} this project?`,
                )
            ) {
                try {
                    if (isActive) {
                        await archiveProject(projectId!).unwrap();
                    } else {
                        await unarchiveProject(projectId!).unwrap();
                    }
                } catch { }
            }
        })();
    };

    const handleLeaveClick = () => {
        if (isOwner) {
            setOpenLeaveDialog(true);
        } else if (
            window.confirm('Are you sure you want to leave this project?')
        ) {
            handleLeaveExecute();
        }
    };

    const handleLeaveExecute = () => {
        void (async () => {
            try {
                const currentUserId = currentUser?.id;
                if (isOwner) {
                    await changeRole({
                        projectId: projectId!,
                        user_id: newOwnerId,
                        role: 2,
                    }).unwrap();
                }

                if (currentUserId) {
                    await revokeMember({
                        projectId: projectId!,
                        user_id: currentUserId,
                    }).unwrap();
                }

                setOpenLeaveDialog(false);
                navigate('/');
            } catch { }
        })();
    };

    const handleFieldChange = (
        field: keyof ProjectUpdateFormData,
        value: string | number,
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <StyledDashboardContainer>
            <StyledHeaderSection>
                <Typography variant="h6" fontWeight="bold">
                    Project Key: {project.key}
                </Typography>

                <Stack direction="row" spacing={2}>
                    <Button
                        startIcon={<LogoutIcon />}
                        variant="outlined"
                        color="error"
                        onClick={handleLeaveClick}
                        disabled={isLeaving}
                    >
                        {isLeaving ? 'Leaving...' : 'Leave'}
                    </Button>

                    {isAdmin && (
                        <Stack direction="row" spacing={2}>
                            {isActive ? (
                                <Button
                                    startIcon={<ArchiveIcon />}
                                    variant="outlined"
                                    color="warning"
                                    onClick={handleArchiveToggle}
                                    disabled={isArchiving}
                                >
                                    {isArchiving ? 'Archiving...' : 'Archive'}
                                </Button>
                            ) : (
                                <Button
                                    startIcon={<UnarchiveIcon />}
                                    variant="outlined"
                                    color="secondary"
                                    onClick={handleArchiveToggle}
                                    disabled={isUnarchiving}
                                >
                                    {isUnarchiving
                                        ? 'Unarchiving...'
                                        : 'Unarchive'}
                                </Button>
                            )}

                            {isActive && (
                                <Button
                                    startIcon={<EditIcon />}
                                    variant="contained"
                                    onClick={handleOpenEdit}
                                >
                                    Edit
                                </Button>
                            )}
                        </Stack>
                    )}
                </Stack>
            </StyledHeaderSection>

            <StyledDetailsCard>
                <Typography variant="h4" gutterBottom fontWeight="medium">
                    {project.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {project.description}
                </Typography>

                <StyledInfoWrapper>
                    <StyledInfoRow>
                        <StyledLabel>Status:</StyledLabel>
                        <Chip
                            label={isActive ? 'Active' : 'Archived'}
                            color={isActive ? 'success' : 'default'}
                            size="small"
                        />
                    </StyledInfoRow>

                    <StyledInfoRow>
                        <StyledLabel>Jira URL:</StyledLabel>
                        <StyledLink href={project.jira_url} target="_blank">
                            {project.jira_url}
                        </StyledLink>
                    </StyledInfoRow>

                    <StyledInfoRow>
                        <StyledLabel>Jira ID:</StyledLabel>
                        <Typography>{project.jira_project_id}</Typography>
                    </StyledInfoRow>
                </StyledInfoWrapper>
            </StyledDetailsCard>

            <Box>
                <StyledTabsWrapper>
                    <Tabs value={tabValue} onChange={handleTabChange}>
                        <StyledTab label="Tickets" />
                        <StyledTab label="Users" />
                        <StyledTab label="Summary" />
                    </Tabs>
                </StyledTabsWrapper>

                {tabValue === 0 && (
                    <StyledTabPanel>
                        <Typography>Tickets</Typography>
                    </StyledTabPanel>
                )}
                {tabValue === 1 && (
                    <StyledTabPanel>
                        <ProjectUsers filter={filterModel} ordering={sortModel} paginationModel={paginationModel} setPaginationModel={setPaginationModel} setFilterModel={setFilterModel} setSortModel={setSortModel} isAdmin={isAdmin} />
                    </StyledTabPanel>
                )}
                {tabValue === 2 && (
                    <StyledTabPanel>
                        <Box>Summary</Box>
                    </StyledTabPanel>
                )}
            </Box>

            <Dialog
                open={openEdit}
                handleClose={() => setOpenEdit(false)}
                title={DASHBOARD_TEXT.editTitle}
                DialogContentData={
                    <EditDialogContent
                        formData={formData}
                        handleFieldChange={handleFieldChange}
                    />
                }
                DialogActionsContent={
                    <EditDialogActions
                        isUpdating={isUpdating}
                        onCancel={() => setOpenEdit(false)}
                        onSave={handleUpdate}
                    />
                }
            />
            <Dialog
                open={openLeaveDialog}
                handleClose={() => setOpenLeaveDialog(false)}
                title="Transfer Ownership & Leave"
                DialogContentData={
                    <StyledDialogContentWrapper>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            As the project owner, you must transfer ownership to
                            another member before leaving.
                        </Typography>
                        <TextField
                            select
                            fullWidth
                            label="Select New Owner"
                            value={newOwnerId}
                            onChange={(e) => setNewOwnerId(e.target.value)}
                        >
                            {members?.results.length > 0 ? (
                                members?.results.map((m) => (
                                    <MenuItem
                                        key={m.member.id}
                                        value={m.member.id}
                                    >
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            width="100%"
                                        >
                                            <Typography>
                                                {m.member.first_name}{' '}
                                                {m.member.last_name}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                (
                                                {m.role === 1
                                                    ? 'Admin'
                                                    : 'Developer'}
                                                )
                                            </Typography>
                                        </Stack>
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem disabled>
                                    No other members available
                                </MenuItem>
                            )}
                        </TextField>
                    </StyledDialogContentWrapper>
                }
                DialogActionsContent={
                    <EditDialogActions
                        isUpdating={isLeaving}
                        onCancel={() => setOpenLeaveDialog(false)}
                        onSave={handleLeaveExecute}
                        saveText={
                            isLeaving ? 'Processing...' : 'Transfer & Leave'
                        }
                        disabled={!newOwnerId || isLeaving}
                    />
                }
            />
        </StyledDashboardContainer>
    );
};

const EditDialogContent = ({
    formData,
    handleFieldChange,
}: {
    formData: ProjectUpdateFormData;
    handleFieldChange: (
        field: keyof ProjectUpdateFormData,
        value: string | number,
    ) => void;
}) => (
    <StyledDialogContentWrapper>
        <TextField
            fullWidth
            label="Title"
            value={formData.title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
        />
        <TextField
            fullWidth
            multiline
            rows={3}
            label="Description"
            value={formData.description}
            onChange={(e) => handleFieldChange('description', e.target.value)}
        />
    </StyledDialogContentWrapper>
);

const EditDialogActions = ({
    isUpdating,
    onCancel,
    onSave,
    saveText,
    disabled,
}: EditDialogActionsProps) => (
    <>
        <Button onClick={onCancel} color="inherit">
            Cancel
        </Button>
        <Button
            variant="contained"
            onClick={onSave}
            disabled={disabled ?? isUpdating}
        >
            {saveText ?? (isUpdating ? 'Saving...' : 'Save Changes')}
        </Button>
    </>
);
