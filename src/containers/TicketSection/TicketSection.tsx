import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { TicketCreateResponse } from 'types/common';
import { handleFilterChange, handleSortChange } from 'utils/utils';

import { Add } from '@mui/icons-material';
import { Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { GridRowParams } from '@mui/x-data-grid';

import { SectionCard, Table } from '@components';
import { PRIVATE_PATHS } from '@constant';
import { TicketFormContainer } from '@containers';
import { useGetProjectTicketsQuery } from '@service';

import { columns } from './TicketSection.configs';
import { HeaderStack } from './TicketSection.styles';
import { TicketSectionProps } from './TicketSection.types';

export const TicketSection = ({ isAdmin, isActive }: TicketSectionProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const [filterModel, setFilterModel] = useState({});
    const [sortModel, setSortModel] = useState<string>();

    const { data: tickets, isLoading } = useGetProjectTicketsQuery({
        projectId: id || '',
        limit: paginationModel.pageSize,
        offset: paginationModel.page * paginationModel.pageSize,
        ordering: sortModel,
        filter: filterModel,
    });

    const ticketsData = tickets?.data.results ?? [];
    const ticketsCount = tickets?.data.count ?? 0;

    const handleOnRowClick = (params: GridRowParams<TicketCreateResponse>) => {
        navigate(
            `${PRIVATE_PATHS.PROJECTS}/${id}${PRIVATE_PATHS.TICKETS}/${params.row.id}`,
        );
    };

    return (
        <>
            <SectionCard
                titleContent={
                    <HeaderStack>
                        <Typography variant="h2">Tickets</Typography>
                        {isAdmin && isActive && (
                            <Button
                                variant="contained"
                                startIcon={!isMobile && <Add />}
                                onClick={() => setIsTicketModalOpen(true)}
                            >
                                {isMobile ? <Add /> : 'Create Ticket'}
                            </Button>
                        )}
                    </HeaderStack>
                }
                mainContent={
                    <Table
                        loading={isLoading}
                        rows={ticketsData}
                        columns={columns}
                        rowCount={ticketsCount}
                        paginationModel={paginationModel}
                        onFilterModelChange={(newModel) =>
                            handleFilterChange(newModel, setFilterModel)
                        }
                        onSortModelChange={(newModel) =>
                            handleSortChange(newModel, setSortModel)
                        }
                        onPaginationModelChange={setPaginationModel}
                        sx={{ cursor: 'pointer' }}
                        onRowClick={handleOnRowClick}
                    />
                }
            />
            <TicketFormContainer
                open={isTicketModalOpen}
                onClose={() => setIsTicketModalOpen(false)}
            />
        </>
    );
};
