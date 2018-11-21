import { ValidationType } from '../../types'

interface IValidationContext<T> {
	readonly progress: IValidationProgress<T>;
	readonly state: any;
}

interface IValidationMessage {
	readonly type: ValidationType;
	readonly caption: string;
}

interface IValidationProgress<T> {
	readonly context: { value: T, message: IValidationMessage };
	cancel(): void;
}

interface IValidationResponse<T> {
	readonly value: T;
	readonly hasError: boolean;
	readonly wasCanceled: boolean;
	readonly validationMessages: IValidationMessage[];
}

interface IValidator<T> {
	Validate(value: T, failFast?: boolean, context?: IValidationContext<T>): Promise<IValidationResponse<T>>;
}



interface IValidationStartupState<T> {
    validators: IValidator<T> [],
    setupValidation: () => IValidationLiveState
}

export {
    IValidationContext,
    IValidationMessage,
    IValidationProgress,
    IValidationResponse,
    IValidator,
    IValidationStartupState
}