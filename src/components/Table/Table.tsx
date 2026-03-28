import Box from '@mui/material/Box';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';

import { TableProps } from './Table.types';

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
    <Box height="60vh">
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
            {...props}
        />
    </Box>
);
