import * as validators from '../../app/validators'
 

interface IValidationIndex<T> {
    [primaryKey: string]: {
        entry: T,
        response: validators.IValidationResponse<T>,
    }  
}

interface Validation<T> {
    fetching: string | null,
    fetched: string[],
    validators: validators.IValidator<T> [],
    toValidate: T[],
    results: IValidationIndex<T>,
}

export default Validation; 