import { SortDescriptor, CompositeFilterDescriptor } from "@progress/kendo-data-query";

export type CollectionState = {
    fetching: boolean,
    fetched: boolean,
    updated: boolean,
    errors: Error[],
    data: any [],
}

export type EditorState = {
    editIndex: number,
    inEdit: string | null,
    userInEdit: User | null,
    inCreateMode: boolean,
    data: any[],
}

export type ErrorState = {
    alertOpen: boolean,
    errors: any,
}

export type UIState = {
    showPasswordModal: boolean,
    showDeleteConfirmation: boolean,
}

export type ValidationState = {
    toValidate: string | null,
    schema: any,
}

export type GridState = {
    collection: CollectionState,
    editor: EditorState,
    error: ErrorState,
    ui: UIState,
    validation: ValidationState,
    sort: SortDescriptor[],
    filter: CompositeFilterDescriptor,

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
