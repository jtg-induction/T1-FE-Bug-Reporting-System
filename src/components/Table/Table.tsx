import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import { TableProps } from './Table.types';

export const Table = ({ loading, rows, columns, pageSize }: TableProps) => (
    <Box height={400}>
        <DataGrid
            loading={loading}
            rows={rows}
            autoHeight
            columns={columns}
            pageSizeOptions={[5]}
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: pageSize },
                },
            }}
            disableRowSelectionOnClick
        />
    </Box>
);
