import { useMemo, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { showSnackbar } from 'redux/features/profileSlice';
import { useAppDispatch } from 'redux/store';

import {
    Archive,
    Download,
    Edit,
    Logout,
    Unarchive,
} from '@mui/icons-material';
import { Chip, Stack, Typography } from '@mui/material';

import { ActionMenu, ActionMenuItem, SectionCard } from '@components';
import { PRIVATE_PATHS, ROLE_OWNER } from '@constant';
import {
    EditProjectFormContainer,
    JQLImportContainer,
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

const getArchiveLabel = (
    isArchiving: boolean,
    isUnarchiving: boolean,
    isActive: boolean,
) => {
    if (isArchiving) return 'Archiving...';
    if (isUnarchiving) return 'Unarchiving...';
    return isActive ? 'Archive' : 'Unarchive';
};

export const ProjectDetailContainer = ({
    isActive,
    isAdmin,
    isOwner,
    projectData,
    currentUserData,
}: ProjectDetailProps) => {
    const { id: projectId } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

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
    const [isExpanded, setIsExpanded] = useState(false);
    const [openImport, setOpenImport] = useState(false);

    const projectMembersData = members?.data.results ?? [];

    const projectMemberOptions = useMemo(() => {
        if (projectMembersData.length === 0) {
            return [{ LABEL: 'No other members available', VALUE: '' }];
        }
        return projectMembersData.map((m) => ({
            LABEL: `${m.member.first_name} ${m.member.last_name} (${m.role === 1 ? 'Admin' : 'Developer'})`,
            VALUE: m.member.id,
        }));
    }, [projectMembersData]);

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
        })();
    };

    const handleLeaveClick = () => {
        if (isOwner) {
            setOpenLeaveDialog(true);
        } else {
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
                    role: ROLE_OWNER,
                }).unwrap();
            }

            if (currentUserId) {
                await revokeMember({
                    projectId: projectId!,
                    user_id: currentUserId,
                }).unwrap();
            }

            setOpenLeaveDialog(false);
            navigate(PRIVATE_PATHS.DASHBOARD);
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
        {
            id: 'edit',
            label: 'Edit Project',
            icon: <Edit fontSize="small" />,
            onClick: () => setOpenEdit(true),
            display: isActive && isAdmin,
        },
        {
            id: 'import',
            label: 'Import Ticket',
            icon: <Download fontSize="small" />,
            onClick: () => setOpenImport(true),
            display: isActive && isAdmin,
        },
        {
            id: 'archive-toggle',
            label: getArchiveLabel(isArchiving, isUnarchiving, isActive),
            icon: isActive ? (
                <Archive fontSize="small" />
            ) : (
                <Unarchive fontSize="small" />
            ),
            onClick: handleArchiveToggle,
            disabled: isArchiving || isUnarchiving,
            display: isAdmin,
        },
        {
            id: 'divider-1',
            isDivider: true,
            display: isActive || isAdmin,
        },
        {
            id: 'leave',
            label: isLeaving ? 'Leaving...' : 'Leave Project',
            icon: <Logout fontSize="small" />,
            onClick: handleLeaveClick,
            disabled: isLeaving,
            textColor: 'error.main',
            display: isActive,
        },
    ];

    return (
        <>
            <SectionCard
                titleContent={
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
                mainContent={
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
                projectMemberOptions={projectMemberOptions}
            />

            <JQLImportContainer
                open={openImport}
                onClose={() => setOpenImport(false)}
            />
        </>
    );
};
