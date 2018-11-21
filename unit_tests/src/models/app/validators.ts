import {IValidationContext, IValidationMessage, IValidationResponse, IValidator} from '../store/Validation';

class ValidationResponse<T> implements IValidationResponse<T> {
	public value: T;
	public hasError: boolean;
	public wasCanceled: boolean;
	public validationMessages: IValidationMessage[];
}

class Validator<T> implements IValidator<T> {
	public constructor(private _validateFn: (value: T, failFast?: boolean, context?: IValidationContext<T>) => Promise<IValidationResponse<T>>) {};
	
	public Validate(value: T, failFast = true, context?: IValidationContext<T> | undefined): Promise<IValidationResponse<T>> {
		return this._validateFn(value, failFast, context);
	}
}

class DebounceValidator<T> implements IValidator<T> {
	private _debouncer: any;
	private _timeout: any;
	private _validator: IValidator<T>;

	public constructor(validators: IValidator<T>[], timeout: number) {
		this._timeout = timeout;
		this._validator = validators.length === 1 ? validators[0] : new CompoundValidator(validators);
	}

	public Validate(value: T, failFast = true, context?: IValidationContext<T> | undefined): Promise<IValidationResponse<T>> {
		clearTimeout(this._debouncer);
		return new Promise<IValidationResponse<T>>(resolve => {
			this._debouncer = setTimeout(() => {
				this._validator.Validate(value, failFast, context).then(v => resolve(v));
			}, this._timeout);
		});
	}
}

class CompoundValidator<T> implements IValidator<T> {

	public constructor(private _validators: IValidator<T>[]) {};

	public Validate(value: T, failFast = true, context?: IValidationContext<T> | undefined): Promise<IValidationResponse<T>> {
		let results: Promise<IValidationResponse<T>>[] = [];
		this._validators.forEach(v => {
			results.push(v.Validate(value, failFast, context));
		});
		return Promise.all(results).then(values => this.Merge(values));
	}

	private Merge(responses: IValidationResponse<T>[]): IValidationResponse<T> {
		throw new Error("Not implemented");
	}
}

export {
	ValidationResponse,
	Validator,
	DebounceValidator,
	CompoundValidator,
}