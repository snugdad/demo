import * as Joi from 'joi'
import { User } from './types' 

export const userSchema: any = Joi.object().keys({
	id: Joi.string(),
	firstName: Joi.string().min(2).max(20).required(),
	lastName: Joi.string().min(2).max(20).required(),
	username: Joi.string().min(5).max(20).required(),
	password: Joi.string().min(6).max(25).required(),
	isActive: Joi.boolean().required(),
	isEntryAdmin: Joi.boolean().required(),
	isListAdmin: Joi.boolean().required(),
	isLocationManager: Joi.boolean().required(),
	isOperatorAdmin: Joi.boolean().required(),
	isUserAdmin: Joi.boolean().required(),
})

export function userPassesConstraintValidation (user: User) {
	const result: any = Joi.validate({ ...user }, userSchema)
	console.log(result);
	return result.error === null;
}
