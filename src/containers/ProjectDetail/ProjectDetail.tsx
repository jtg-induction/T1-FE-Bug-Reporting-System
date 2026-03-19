import { useMemo, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { showSnackbar } from 'redux/features/profileSlice';
import { useAppDispatch } from 'redux/store';

import ArchiveIcon from '@mui/icons-material/Archive';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { Chip, Stack, Typography } from '@mui/material';

import { ActionMenu, ActionMenuItem, SectionCard } from '@components';
import {
    EditProjectFormContainer,
    TransferOwnershipFormContainer,
} from '@containers';
import {
    useArchiveProjectMutation,
    useChangeRoleMutation,
    useGetProjectMembersQuery,
    useRevokeMemberMutation,
    useUnarchiveProjectMutation,
    useUpdateProjectMutation,
} from '@service';

import { INITIAL_EDIT_STATE } from './ProjectDetail.config';
import {
    StyledDescriptionText,
    StyledDescriptionWrapper,
    StyledDetailsCard,
    StyledHeaderSection,
    StyledInfoRow,
    StyledInfoWrapper,
    StyledLabel,
    StyledLink,
    StyledShowMoreButton,
} from './ProjectDetail.styles';
import {
    ProjectDetailProps,
    ProjectUpdateFormData,
} from './ProjectDetail.types';

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

    const dispatch = useAppDispatch();
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
    const [isExpanded, setIsExpanded] = useState(false);

    const membersData = members?.data.results ?? [];

    const memberOptions = useMemo(() => {
        if (membersData.length === 0) {
            return [{ LABEL: 'No other members available', VALUE: '' }];
        }
        return membersData.map((m) => ({
            LABEL: `${m.member.first_name} ${m.member.last_name} (${m.role === 1 ? 'Admin' : 'Developer'})`,
            VALUE: m.member.id,
        }));
    }, [membersData]);

    const initialEditData: ProjectUpdateFormData = useMemo(() => {
        if (!projectData) return INITIAL_EDIT_STATE;
        return {
            title: projectData.title,
            description: projectData.description,
            status: projectData.status,
        };
    }, [projectData]);

    const handleEditSubmit = async (data: ProjectUpdateFormData) => {
        try {
            await updateProject({
                projectId: projectId!,
                updateData: data,
            }).unwrap();
            setOpenEdit(false);
        } catch {
            dispatch(
                showSnackbar({
                    message: 'Project Updation Failed',
                    severity: 'error',
                }),
            );
        }
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
                } catch {
                    dispatch(
                        showSnackbar({
                            message: 'Project Archiving Failed',
                            severity: 'error',
                        }),
                    );
                }
            }
        })();
    };

    const handleLeaveClick = () => {
        if (isOwner) {
            setOpenLeaveDialog(true);
        } else if (
            window.confirm('Are you sure you want to leave this project?')
        ) {
            executeLeaveProject();
        }
    };

    const executeLeaveProject = async (newOwnerId?: string) => {
        try {
            const currentUserId = currentUserData?.id;

            if (isOwner && newOwnerId) {
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
        } catch {
            dispatch(
                showSnackbar({
                    message: 'Leave Project Failed',
                    severity: 'error',
                }),
            );
        }
    };

    const handleTransferSubmit = async (data: { newOwnerId: string }) => {
        if (!data.newOwnerId) return;
        await executeLeaveProject(data.newOwnerId);
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
                onClick: () => setOpenEdit(true),
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
                        <StyledDescriptionWrapper>
                            <StyledDescriptionText
                                variant="body1"
                                $isExpanded={isExpanded}
                            >
                                {descriptionText}
                            </StyledDescriptionText>
                            {isLongDescription && (
                                <StyledShowMoreButton
                                    size="small"
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    disableRipple
                                >
                                    {isExpanded ? 'Show less' : 'Show more'}
                                </StyledShowMoreButton>
                            )}
                        </StyledDescriptionWrapper>

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

            <EditProjectFormContainer
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                onSubmit={handleEditSubmit}
                isLoading={isUpdating}
                initialData={initialEditData}
            />

            <TransferOwnershipFormContainer
                open={openLeaveDialog}
                onClose={() => setOpenLeaveDialog(false)}
                onSubmit={handleTransferSubmit}
                isLoading={isLeaving}
                memberOptions={memberOptions}
            />
        </>
    );
};
