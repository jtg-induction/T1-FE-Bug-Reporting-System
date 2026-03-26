import FilterListIcon from '@mui/icons-material/FilterList';
import { Badge, Box } from '@mui/material';
import {
    DataGrid,
    DataGridProps,
    FilterPanelTrigger,
    gridFilterModelSelector,
    Toolbar,
    ToolbarButton,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';

import { StyledBox } from './Table.styles';
import { TableProps } from './Table.types';

const CustomFilterButton = () => {
    const apiRef = useGridApiContext();
    const filterModel = useGridSelector(apiRef, gridFilterModelSelector);

    const activeFiltersCount = filterModel.items.filter(
        (item) =>
            item.value !== undefined &&
            item.value !== null &&
            item.value !== '',
    ).length;

    const hasActiveFilters = activeFiltersCount > 0;

    return (
        <FilterPanelTrigger
            render={
                <ToolbarButton color={hasActiveFilters ? 'primary' : 'inherit'}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Badge
                            badgeContent={activeFiltersCount}
                            color="primary"
                            variant="dot"
                            invisible={!hasActiveFilters}
                            sx={{
                                '& .MuiBadge-badge': {
                                    top: 2,
                                    right: 2,
                                },
                            }}
                        >
                            <FilterListIcon fontSize="medium" />
                        </Badge>
                    </Box>
                </ToolbarButton>
            }
        />
    );
};

const CustomToolbar = () => (
    <Toolbar>
        <CustomFilterButton />
    </Toolbar>
);

export const Table = ({
    loading,
    rows,
    columns,
    paginationModel,
    onPaginationModelChange,
    onFilterModelChange,
    onSortModelChange,
    rowCount,
    ...props
}: TableProps & DataGridProps) => (
    <StyledBox>
        <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            rowCount={rowCount}
            loading={loading}
            paginationModel={paginationModel}
            onPaginationModelChange={onPaginationModelChange}
            onFilterModelChange={onFilterModelChange}
            onSortModelChange={onSortModelChange}
            paginationMode="server"
            filterMode="server"
            sortingMode="server"
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
            disableColumnMenu
            showToolbar
            slots={{
                toolbar: CustomToolbar,
            }}
            {...props}
        />
    </StyledBox>
);
