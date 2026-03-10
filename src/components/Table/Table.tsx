import { useEffect } from 'react';

import Box from '@mui/material/Box';
import { DataGrid, DataGridProps, useGridApiRef } from '@mui/x-data-grid';

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
}: TableProps & DataGridProps) => {
    const apiRef = useGridApiRef();

    useEffect(() => {
        if (!loading && rows && rows.length > 0) {
            const timeout = setTimeout(() => {
                apiRef.current?.autosizeColumns({
                    includeHeaders: true,
                    includeOutliers: true,
                    expand: true,
                });
            }, 50);

            return () => clearTimeout(timeout);
        }
    }, [loading, rows, apiRef]);

    return (
        <Box>
            <DataGrid
                apiRef={apiRef}
                paginationMode="server"
                filterMode="server"
                sortingMode="server"
                rowCount={rowCount}
                loading={loading}
                rows={rows}
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
};
