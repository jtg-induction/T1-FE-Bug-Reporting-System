import { GridColDef, GridValidRowModel } from '@mui/x-data-grid';

export interface TableProps {
    rows: GridValidRowModel[];
    columns: GridColDef<GridValidRowModel>[];
    pageSize: number;
    loading: boolean;
}
