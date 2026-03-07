import Box from '@mui/material/Box';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';

import { TableProps } from './Table.types';

export const Table = ({ loading, rows, columns, paginationModel, onPaginationModelChange, onFilterModelChange, onSortModelChange, rowCount, ...props }: TableProps & DataGridProps) => (
    <Box height={400}>
        <DataGrid
            paginationMode='server'
            filterMode='server'
            sortingMode='server'
            rowCount={rowCount}
            loading={loading}
            rows={rows}
            autoHeight
            columns={columns}
            pageSizeOptions={[5]}
            paginationModel={paginationModel}
            onPaginationModelChange={onPaginationModelChange}
            onFilterModelChange={onFilterModelChange}
            onSortModelChange={onSortModelChange}
            disableRowSelectionOnClick
            {...props}
        />
    </Box>
);
