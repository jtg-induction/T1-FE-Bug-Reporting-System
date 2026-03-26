import { useEffect, useState } from 'react';

import { operatorMap } from 'constant/operatorMap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ProjectListResponse } from 'types/common';
import { handleFilterChange, handleSortChange } from 'utils/utils';

import { Add } from '@mui/icons-material';
import { Button, useMediaQuery, useTheme } from '@mui/material';
import { GridRowParams } from '@mui/x-data-grid';

import { SectionCard, Table } from '@components';
import { PRIVATE_PATHS } from '@constant';
import { useGetProjectsQuery } from '@service';

import { columns } from './ActiveProjectSection.configs';
import { HeaderStack } from './ActiveProjectSection.styles';
import { ProjectsSectionProps } from './ActiveProjectSection.types';

export const ActiveProjectSection = ({ onAddClick }: ProjectsSectionProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const pageQuery = searchParams.get('page');
    const filterQuery = searchParams.get('filter');

    const [paginationModel, setPaginationModel] = useState({
        page: pageQuery ? parseInt(pageQuery, 10) : 0,
        pageSize: 10,
    });

    useEffect(() => {
        if (!filterQuery) {
            setSearchParams(
                (params) => {
                    params.set('filter', 'status is 2');
                    return params;
                },
                { replace: true },
            );
        }
    }, []);

    const initialGridFilter = (() => {
        if (!filterQuery)
            return { items: [{ field: 'status', operator: 'is', value: 2 }] };

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
        if (!filterQuery) return { status: 2 };

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

    const { data: projects, isLoading } = useGetProjectsQuery({
        limit: paginationModel.pageSize,
        offset: paginationModel.page * paginationModel.pageSize,
        ordering: sortModel,
        filter: filterModel,
    });

    const projectsData = projects?.data.results ?? [];
    const projectsCount = projects?.data.count ?? 0;

    const handleRowClick = (params: GridRowParams<ProjectListResponse>) => {
        navigate(`${PRIVATE_PATHS.PROJECTS}${params.row.id}`);
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
        <SectionCard
            titleContent={
                <HeaderStack>
                    <Button
                        variant="contained"
                        startIcon={!isMobile && <Add />}
                        onClick={onAddClick}
                    >
                        {isMobile ? <Add /> : 'Create Project'}
                    </Button>
                </HeaderStack>
            }
            mainContent={
                <Table
                    loading={isLoading}
                    rows={projectsData}
                    columns={columns}
                    rowCount={projectsCount}
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
                    onRowClick={handleRowClick}
                    sx={{ cursor: 'pointer' }}
                    initialState={{
                        filter: {
                            filterModel: initialGridFilter,
                        },
                    }}
                />
            }
        />
    );
};
