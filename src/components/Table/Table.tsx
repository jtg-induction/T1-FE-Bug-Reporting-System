import { useCallback, useEffect } from 'react';

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

    const handleAutosize = useCallback(() => {
        apiRef.current?.autosizeColumns({
            includeHeaders: true,
            includeOutliers: true,
            expand: true,
        });
    }, [apiRef]);

    useEffect(() => {
        if (!loading) {
            const timeout = setTimeout(handleAutosize, 50);
            return () => clearTimeout(timeout);
        }
    }, [loading, rows, handleAutosize]);

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
                onResize={handleAutosize}
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
