import { IValidator } from './validation'


export interface InitialGridState<T> {
    grid: {
        index: string[],
        columnNames: any
    },
    collection: {
        data: T[],
        fetching: boolean,
        fetched: boolean,
        error: Error | null,
    },
    validation: {
        fetching: boolean,
        fetched: boolean,
        fetchedList: T[],
        fetchErrors: any,
        validators: IValidator<T>[],
        validEntries: any,
        invalidEntries: any,
    }
}