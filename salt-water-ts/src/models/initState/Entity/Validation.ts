interface PrimaryKeyIndex<T> {
    [pKey: string]: T
}

type Validator<T> = any

interface validation<T> {
    fetching: string | null,
    fetched: string[],
    validators: Validator<T> [],
    toValidate: T[],
    validEntries: PrimaryKeyIndex<T>,
    invalidEntries: PrimaryKeyIndex<T>,
}

export default validation;