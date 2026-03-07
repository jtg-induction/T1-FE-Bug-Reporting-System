import { Dispatch, SetStateAction } from "react"

import { operatorMap } from "constant/operatorMap"

import { GridFilterModel } from "@mui/x-data-grid"
import { GridSortModel } from "@mui/x-data-grid"

export const handleFilterChange = (newModel: GridFilterModel, setFilterModel: Dispatch<SetStateAction<object>>) => {
    if (newModel.items.length==0) setFilterModel({})
    else if (newModel.items[0].value !==undefined) {
        const field = newModel.items[0].field
        const value = newModel.items[0].value as (string | number)
        const operator = newModel.items[0].operator
        const lookup = operatorMap[operator];
        let key = `${field}`
        if (lookup) {
            key = key + `__${lookup}`
        }
        const filter: Record<string, number | string> = {}
        filter[key] = value
        setFilterModel(filter)
    }else if ("value" in newModel.items[0]) {
        const field = newModel.items[0].field
        const operator = newModel.items[0].operator
        const filter: Record<string, boolean> = {}
        const key = `${field}__isnull`
        if (operator==='isNotEmpty') {
            filter[key] = false
        }else {
            filter[key] = true
        }
        setFilterModel(filter)
    }
}

export const handleSortChange = (newModel: GridSortModel, setSortModel: Dispatch<SetStateAction<string | undefined>>) => {
    if (newModel.length==0) setSortModel(undefined)
    else if (newModel[0].sort == 'desc') {
        setSortModel(`-${newModel[0].field}`)
    } else {
        setSortModel(newModel[0].field)
    }
}