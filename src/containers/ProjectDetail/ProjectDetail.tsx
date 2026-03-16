import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

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
    TextField,
    Typography,
} from '@mui/material';

import { ActionMenu, ActionMenuItem, Dialog, SectionCard } from '@components';
import {
    useArchiveProjectMutation,
    useChangeRoleMutation,
    useGetProjectMembersQuery,
    useRevokeMemberMutation,
    useUnarchiveProjectMutation,
    useUpdateProjectMutation,
} from '@service';

import { DASHBOARD_TEXT, INITIAL_EDIT_STATE } from './ProjectDetail.config';
import {
    StyledDetailsCard,
    StyledDialogContentWrapper,
    StyledHeaderSection,
    StyledInfoRow,
    StyledInfoWrapper,
    StyledLabel,
    StyledLink,
} from './ProjectDetail.styles';
import {
    EditDialogActionsProps,
    ProjectDetailProps,
    ProjectUpdateFormData,
} from './ProjectDetail.types';

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

export const ProjectDetailContainer = ({
    isActive,
    isAdmin,
    isOwner,
    projectData,
    currentUserData,
}: ProjectDetailProps) => {
    const { id: projectId } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: members } = useGetProjectMembersQuery(
        { projectId: projectId, limit: 100, offset: 0 },
        { skip: !projectId },
    );

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

    const [isExpanded, setIsExpanded] = useState(false);

    const membersData = members?.data.results ?? [];

    const handleOpenEdit = () => {
        if (projectData) {
            setFormData({
                title: projectData.title,
                description: projectData.description,
                status: projectData.status,
            });
        }
        setOpenEdit(true);
    };

    const handleUpdate = () => {
        void (async () => {
            try {
                await updateProject({
                    projectId: projectId!,
                    updateData: formData,
                }).unwrap();
                setOpenEdit(false);
            } catch {}
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
                } catch {}
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
                const currentUserId = currentUserData?.id;
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
            } catch {}
        })();
    };

    const handleFieldChange = (
        field: keyof ProjectUpdateFormData,
        value: string | number,
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    if (!projectData) return null;

    const descriptionText =
        projectData.description || 'No description provided.';
    const isLongDescription = descriptionText.length > 150;

    const menuOptions: ActionMenuItem[] = [
        isActive &&
            isAdmin && {
                id: 'edit',
                label: 'Edit Project',
                icon: <EditIcon fontSize="small" />,
                onClick: handleOpenEdit,
            },
        isAdmin && {
            id: 'archive-toggle',
            label: isArchiving
                ? 'Archiving...'
                : isUnarchiving
                  ? 'Unarchiving...'
                  : isActive
                    ? 'Archive'
                    : 'Unarchive',
            icon: isActive ? (
                <ArchiveIcon fontSize="small" />
            ) : (
                <UnarchiveIcon fontSize="small" />
            ),
            onClick: handleArchiveToggle,
            disabled: isArchiving || isUnarchiving,
        },
        (isActive || isAdmin) && {
            id: 'divider-1',
            isDivider: true,
        },
        isActive && {
            id: 'leave',
            label: isLeaving ? 'Leaving...' : 'Leave Project',
            icon: <LogoutIcon fontSize="small" />,
            onClick: handleLeaveClick,
            disabled: isLeaving,
            textColor: 'error.main',
        },
    ].filter((item): item is ActionMenuItem => Boolean(item));

    return (
        <>
            <SectionCard
                TitleContent={
                    <StyledHeaderSection>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="h6" fontWeight="bold">
                                {projectData?.title}
                                <Typography
                                    component="span"
                                    variant="subtitle1"
                                    color="text.secondary"
                                >
                                    [{projectData?.key}]
                                </Typography>
                            </Typography>
                            <Chip
                                label={isActive ? 'Active' : 'Archived'}
                                color={isActive ? 'success' : 'default'}
                                size="small"
                            />
                        </Stack>

                        <ActionMenu items={menuOptions} />
                    </StyledHeaderSection>
                }
                MainContent={
                    <StyledDetailsCard>
                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="body1"
                                className="description-text"
                                sx={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: isExpanded ? 'unset' : 1,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {descriptionText}
                            </Typography>
                            {isLongDescription && (
                                <Button
                                    size="small"
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    sx={{
                                        mt: 0.5,
                                        p: 0,
                                        minWidth: 'auto',
                                        textTransform: 'none',
                                        fontWeight: 'bold',
                                    }}
                                    disableRipple
                                >
                                    {isExpanded ? 'Show less' : 'Show more'}
                                </Button>
                            )}
                        </Box>

                        <StyledInfoWrapper>
                            <StyledInfoRow>
                                <StyledLabel>Jira URL</StyledLabel>
                                <StyledLink
                                    to={projectData?.jira_url}
                                    target="_blank"
                                >
                                    {projectData?.jira_url}
                                </StyledLink>
                            </StyledInfoRow>

                            <StyledInfoRow>
                                <StyledLabel>Jira ID</StyledLabel>
                                <Typography variant="body1" noWrap>
                                    {projectData?.jira_project_id}
                                </Typography>
                            </StyledInfoRow>
                        </StyledInfoWrapper>
                    </StyledDetailsCard>
                }
            />

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
                            {membersData.length > 0 ? (
                                membersData.map((m) => (
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
        </>
    );
};
