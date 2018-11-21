import {  Validator, CompoundValidator, ValidationType } from '../../models/app/validators';
import { IValidator, IValidationResponse } from '../../models/container/store/Validation';

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