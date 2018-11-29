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
    isActive: boolean,
    isEntryAdmin: boolean,
    isListAdmin: boolean,
    isLocationManager: boolean,
    isOperatorAdmin: boolean,
    isUserAdmin: boolean,
}

export const newUserTemplate: User = {
    id: 'temp',
    firstName: "",
    lastName: "",
    username: "",
    password: "Circular>>0x08<<",
    isActive: true,
    isEntryAdmin: false,
    isListAdmin: false,
    isLocationManager: false,
    isOperatorAdmin: false,
    isUserAdmin: false,
}
