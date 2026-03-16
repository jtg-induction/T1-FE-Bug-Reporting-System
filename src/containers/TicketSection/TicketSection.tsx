import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { TicketCreateResponse } from 'types/common';
import { handleFilterChange, handleSortChange } from 'utils/utils';

import { Add } from '@mui/icons-material';
import { Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { GridColDef, GridRowParams } from '@mui/x-data-grid';

import { SectionCard, Table } from '@components';
import { PRIVATE_PATHS } from '@constant';
import { TicketFormContainer } from '@containers';
import { TicketFormValues } from '@schemas';
import { useCreateTicketMutation, useGetProjectTicketsQuery } from '@service';

import { HeaderStack } from './TicketSection.styles';
import { TicketSectionProps } from './TicketSection.types';

export const TicketSection = ({ isAdmin, isActive }: TicketSectionProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [createTicket, { isLoading: isCreatingTicket }] = useCreateTicketMutation();

    const handleCreateTicket = async (formData: TicketFormValues) => {
        if (!id) return;
        try {
            await createTicket({
                ...formData,
                project_id: id,
            }).unwrap();
            setIsTicketModalOpen(false);
        } catch { }
    };

    const columns: GridColDef<TicketCreateResponse>[] = [
        {
            field: 'id',
            headerName: 'ID',
            width: 80,
            renderCell: (params) =>
                params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
        },
        { field: 'title', headerName: 'Title', flex: 1.5 },
        { field: 'reporter', headerName: 'Reporter', flex: 1 },
        { field: 'assignee', headerName: 'Assignee', flex: 1 },
        {
            field: 'severity',
            headerName: 'Severity',
            flex: 0.8,
            type: 'singleSelect',
            valueOptions: [
                { value: 1, label: 'Low' },
                { value: 2, label: 'Mid' },
                { value: 3, label: 'High' },
            ],
            valueGetter: (value) => value,
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            type: 'singleSelect',
            valueOptions: [
                { value: 1, label: 'Open' },
                { value: 2, label: 'Resolved' },
                { value: 3, label: 'In Progress' },
                { value: 4, label: 'Closed' },
            ],
        },
        {
            field: 'deadline',
            headerName: 'Deadline',
            flex: 1,
            valueGetter: (value) => {
                if (!value) return 'None';
                return new Date(value).toDateString();
            },
        },
    ];

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
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
        navigate(`${PRIVATE_PATHS.PROJECTS}/${id}${PRIVATE_PATHS.TICKETS}/${params.row.id}`)
    }

    return (
        <>
            <SectionCard
                TitleContent={
                    <HeaderStack>
                        <Typography variant="h2">Tickets</Typography>
                        {isAdmin && isActive && (<Button
                            variant="contained"
                            startIcon={!isMobile && <Add />}
                            onClick={() => setIsTicketModalOpen(true)}
                        >
                            {isMobile ? <Add /> : 'Create Ticket'}
                        </Button>)}
                    </HeaderStack>
                }
                MainContent={
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
                onSubmit={handleCreateTicket}
                isLoading={isCreatingTicket}
            />
        </>
    );
};