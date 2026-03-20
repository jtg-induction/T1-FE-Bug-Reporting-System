import { useNavigate } from 'react-router-dom';

import { TrendingUp } from '@mui/icons-material';
import {
    Box,
    Chip,
    CircularProgress,
    List,
    Stack,
    Typography,
} from '@mui/material';

import { ListCard, SectionCard } from '@components';
import { PRIVATE_PATHS } from '@constant';
import { useGetProjectsQuery } from '@service';
import { getTimeFromNow } from '@utils';

import {
    HeaderStack,
    ListFooterContainer,
    ViewAllButton,
} from './TopProjectsList.styles';

export const TopProjectsList = () => {
    const navigate = useNavigate();
    const { data: topProjects, isLoading } = useGetProjectsQuery({
        limit: 5,
        offset: 0,
        ordering: undefined,
        filter: {},
    });
    const projectsData = topProjects?.data.results ?? [];

    return (
        <SectionCard
            titleContent={
                <HeaderStack>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <TrendingUp color="primary" />
                        <Typography variant="h2">Top Projects</Typography>
                    </Stack>
                </HeaderStack>
            }
            mainContent={
                <Stack justifyContent="space-between" height="100%">
                    <Box sx={{ mt: 1 }}>
                        {isLoading ? (
                            <Stack alignItems="center" sx={{ py: 5 }}>
                                <CircularProgress size={28} thickness={5} />
                            </Stack>
                        ) : (
                            <List disablePadding>
                                {projectsData.length > 0 ? (
                                    projectsData.map((project) => (
                                        <ListCard
                                            key={project.id}
                                            title={project.title}
                                            subtitle={`Created ${getTimeFromNow(project.created_at)} ago`}
                                            Info={
                                                <Chip
                                                    size="small"
                                                    sx={(mtheme) => ({
                                                        color: mtheme.palette
                                                            .common.white,
                                                        backgroundColor:
                                                            mtheme.palette
                                                                .secondary.dark,
                                                    })}
                                                    label={`Key - ${project.key}`}
                                                />
                                            }
                                            handleOnClick={() =>
                                                void navigate(
                                                    `${PRIVATE_PATHS.PROJECTS}/${project.id}`,
                                                )
                                            }
                                        />
                                    ))
                                ) : (
                                    <Typography
                                        variant="body2"
                                        sx={{ p: 4, textAlign: 'center' }}
                                        color="text.secondary"
                                    >
                                        No top projects to display.
                                    </Typography>
                                )}
                            </List>
                        )}
                    </Box>

                    {!isLoading && (
                        <ListFooterContainer>
                            <ViewAllButton
                                onClick={() =>
                                    void navigate(PRIVATE_PATHS.PROJECTS)
                                }
                                color="inherit"
                            >
                                {projectsData.length > 0
                                    ? 'VIEW ALL PROJECTS'
                                    : 'CREATE NEW PROJECT'}
                            </ViewAllButton>
                        </ListFooterContainer>
                    )}
                </Stack>
            }
        />
    );
};
