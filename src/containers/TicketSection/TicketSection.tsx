import { useState } from 'react';

import { operatorMap } from 'constant/operatorMap';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
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
    const [searchParams, setSearchParams] = useSearchParams();

    const pageQuery = searchParams.get('page');
    const filterQuery = searchParams.get('filter');

    const [paginationModel, setPaginationModel] = useState({
        page: pageQuery ? parseInt(pageQuery, 10) : 0,
        pageSize: 10,
    });

    const initialGridFilter = (() => {
        if (!filterQuery) return undefined;

        const [field, operator, ...rest] = filterQuery.split(' ');
        const valueStr = rest.join(' ');
        const value =
            valueStr && !isNaN(Number(valueStr)) ? Number(valueStr) : valueStr;

        if (operator === 'isEmpty' || operator === 'isNotEmpty') {
            return { items: [{ field, operator }] };
        }
        return { items: [{ field, operator, value }] };
    })();

    const [filterModel, setFilterModel] = useState<object>(() => {
        if (!filterQuery) return {};

        const [field, operator, ...rest] = filterQuery.split(' ');
        const valueStr = rest.join(' ');

        if (operator === 'isEmpty' || operator === 'isNotEmpty') {
            return { [`${field}__isnull`]: operator === 'isEmpty' };
        }

        const lookup = operatorMap[operator];
        const key = lookup ? `${field}__${lookup}` : field;
        const value =
            valueStr && !isNaN(Number(valueStr)) ? Number(valueStr) : valueStr;

        return { [key]: value };
    });

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

    const handlePaginationChange = (newModel: {
        page: number;
        pageSize: number;
    }) => {
        setPaginationModel(newModel);
        setSearchParams((params) => {
            if (newModel.page === 0) {
                params.delete('page');
            } else {
                params.set('page', newModel.page.toString());
            }
            return params;
        });
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
                            handleFilterChange(
                                newModel,
                                setFilterModel,
                                setSearchParams,
                            )
                        }
                        onSortModelChange={(newModel) =>
                            handleSortChange(newModel, setSortModel)
                        }
                        onPaginationModelChange={handlePaginationChange}
                        sx={{ cursor: 'pointer' }}
                        onRowClick={handleOnRowClick}
                        initialState={{
                            ...(initialGridFilter && {
                                filter: {
                                    filterModel: initialGridFilter,
                                },
                            }),
                        }}
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
