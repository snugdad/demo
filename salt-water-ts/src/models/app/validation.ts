export class ValidationType {
	public static readonly ERROR: ValidationType = new ValidationType(1);
	public static readonly WARNING: ValidationType = new ValidationType(2);
	public static readonly INFO: ValidationType = new ValidationType(3);

	private readonly _value: number;

	private constructor(value : number) {
		this._value = value;
	}

	public get value() {
		return this._value;
	}
}

export interface IValidationContext<T> {
	readonly progress: IValidationProgress<T>;
	readonly state: any;
}

export interface IValidationMessage {
	readonly type: ValidationType;
	readonly caption: string;
}

export interface IValidationProgress<T> {
	readonly context: { value: T, message: IValidationMessage };
	cancel(): void;
}

export interface IValidationResponse<T> {
	readonly value: T;
	readonly hasError: boolean;
	readonly wasCanceled: boolean;
	readonly validationMessages: IValidationMessage[];
}

export class ValidationResponse<T> implements IValidationResponse<T> {
	public value: T;
	public hasError: boolean;
	public wasCanceled: boolean;
	public validationMessages: IValidationMessage[];
}

export interface IValidator<T> {
	Validate(value: T, failFast?: boolean, context?: IValidationContext<T>): Promise<IValidationResponse<T>>;
}

export class Validator<T> implements IValidator<T> {
	public constructor(private _validateFn: (value: T, failFast?: boolean, context?: IValidationContext<T>) => Promise<IValidationResponse<T>>) {};
	
	public Validate(value: T, failFast = true, context?: IValidationContext<T> | undefined): Promise<IValidationResponse<T>> {
		return this._validateFn(value, failFast, context);
	}
}

export class DebounceValidator<T> implements IValidator<T> {
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

export class CompoundValidator<T> implements IValidator<T> {

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

export module Validators {
	export function combine<T>(... validators: IValidator<T>[]): IValidator<T> {
		return new CompoundValidator<T>(validators);
	}

	export function regex(pattern: string, failureMessage?: string): IValidator<string> {
		let validate = new RegExp(pattern);
		return new Validator<string>((value, failFast, context) => {
			let hasError = !value || validate.test(value);
			let caption = !failureMessage ? "" : <string>failureMessage;
			if (hasError && caption === "") {
				caption = `Value ${value} failed validation`;
			}

			return Promise.resolve<IValidationResponse<string>>({
				hasError: hasError,
				validationMessages: [{caption: caption, type: ValidationType.ERROR}],
				value: value,
				wasCanceled: false,
			});
		});
	}

	export function minLength(length: number): IValidator<string> {
		return new Validator<string>((value, failFast, context) => {
			let caption = "";
			let hasError = false;
			if (!value || value.length > length) {
				hasError = true;
				caption = `Value ${value} has exceeded min length ${length}`;
			}

			return Promise.resolve<IValidationResponse<string>>({
				hasError: hasError,
				validationMessages: [{caption: caption, type: ValidationType.ERROR}],
				value: value,
				wasCanceled: false,
			});
		});
	}

	export function maxLength(length: number): IValidator<string> {
		return new Validator<string>((value, fastFail, context) => {
			let caption = "";
			let hasError = false;
			if (!value || value.length > length) {
				hasError = true;
				caption = `Value ${value} has exceeded max length ${length}`;
			}

			return Promise.resolve<IValidationResponse<string>>({
				hasError: hasError,
				validationMessages: [{caption: caption, type: ValidationType.ERROR}],
				value: value,
				wasCanceled: false,
			});
		});
	}
}