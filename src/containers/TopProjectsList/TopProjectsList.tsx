import { useNavigate } from 'react-router-dom';

import { Add, TrendingUp } from '@mui/icons-material';
import {
    Box,
    Button,
    CircularProgress,
    List,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';

import { ListCard, SectionCard } from '@components';
import { PRIVATE_PATHS } from '@constant';
import { useGetProjectsQuery } from '@service';

import {
    HeaderStack,
    ListFooterContainer,
    ViewAllButton,
} from './TopProjectsList.styles';
import { TopProjectListsProps } from './TopProjectsList.types';

export const TopProjectsList = ({ onAddClick }: TopProjectListsProps) => {
    const navigate = useNavigate();
    const { data: topProjects, isLoading } = useGetProjectsQuery();
    const projectsData = topProjects?.data ?? [];
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <SectionCard
            titleContent={
                <HeaderStack>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <TrendingUp color="primary" />
                        <Typography variant="h2">Top Projects</Typography>
                    </Stack>
                    <Button
                        variant="contained"
                        disableElevation
                        startIcon={!isMobile && <Add />}
                        onClick={onAddClick}
                    >
                        {isMobile ? <Add /> : 'New Project'}
                    </Button>
                </HeaderStack>
            }
            mainContent={
                <>
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
                                            Info={<>{project.key}</>}
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

                    {!isLoading && projectsData.length > 0 && (
                        <ListFooterContainer>
                            <ViewAllButton
                                onClick={() => void navigate('/projects')}
                                color="inherit"
                            >
                                VIEW ALL PROJECTS
                            </ViewAllButton>
                        </ListFooterContainer>
                    )}
                </>
            }
        />
    );
};
