import { Dispatch, SetStateAction } from 'react';

import { operatorMap } from 'constant/operatorMap';
import { SetURLSearchParams } from 'react-router-dom';

import { GridFilterModel } from '@mui/x-data-grid';
import { GridSortModel } from '@mui/x-data-grid';

/**
 * Transforms an MUI DataGrid filter model into a backend-compatible filter object
 * (e.g., converting operators to ORM lookups like `field__operator`) and updates the state.
 * * @param {GridFilterModel} newModel - The incoming filter model from the MUI DataGrid.
 * @param {Dispatch<SetStateAction<object>>} setFilterModel - State setter to update the formatted filter object.
 */
export const handleFilterChange = (
    newModel: GridFilterModel,
    setFilterModel: Dispatch<SetStateAction<object>>,
    setSearchParams: SetURLSearchParams,
) => {
    if (newModel.items.length == 0) {
        setFilterModel({});
        setSearchParams((params) => {
            params.delete('filter');
            return params;
        });
    } else if (newModel.items[0].value !== undefined) {
        const field = newModel.items[0].field;
        const value = newModel.items[0].value as string | number;
        const operator = newModel.items[0].operator;

        setSearchParams((params) => {
            params.set('filter', `${field} ${operator} ${value}`);
            return params;
        });

        const lookup = operatorMap[operator];
        let key = `${field}`;
        if (lookup) {
            key = key + `__${lookup}`;
        }
        const filter: Record<string, number | string> = {};
        filter[key] = value;
        setFilterModel(filter);
    } else if ('value' in newModel.items[0]) {
        const field = newModel.items[0].field;
        const operator = newModel.items[0].operator;

        setSearchParams((params) => {
            params.set('filter', `${field} ${operator}`);
            return params;
        });

        const filter: Record<string, boolean> = {};
        const key = `${field}__isnull`;
        if (operator === 'isNotEmpty') {
            filter[key] = false;
        } else {
            filter[key] = true;
        }
        setFilterModel(filter);
    }
};

/**
 * Transforms an MUI DataGrid sort model into a backend-compatible sorting string
 * (prefixing with `-` for descending order) and updates the state.
 * * @param {GridSortModel} newModel - The incoming sort model from the MUI DataGrid.
 * @param {Dispatch<SetStateAction<string | undefined>>} setSortModel - State setter to update the formatted sort string.
 */
export const handleSortChange = (
    newModel: GridSortModel,
    setSortModel: Dispatch<SetStateAction<string | undefined>>,
) => {
    if (newModel.length === 0) setSortModel(undefined);
    else if (newModel[0].sort === 'desc') {
        setSortModel(`-${newModel[0].field}`);
    } else {
        setSortModel(newModel[0].field);
    }
};
