import { SortDescriptor, CompositeFilterDescriptor } from "@progress/kendo-data-query";

/* This describes the state object passed to the rootReducer at startup */
export type GridState = {
    collection: {
        fetching: boolean,
        fetched: boolean,
        errors: Error[],
        data: any [],
    }
    editor: {
        inEdit: string | null,
        editIndex: number,
        data: any[],
    }
    filter: CompositeFilterDescriptor,
    sort: SortDescriptor [],
}


export type User = {
    id: string, 
    firstName: string, 
    lastName: string,
    username: string,
    password: string,
    isActive: string,
    isEntryAdmin: boolean,
    isListAdmin: boolean,
    isLocationManager: boolean,
    isOperatorAdmin: boolean,
    isUserAdmin: boolean,
}

