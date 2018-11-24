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
	console.log(user, result)
	return result.error === null;
}

// const user: User =     
// {
// 	"id":"20b57c1a-892d-4b75-b926-e54dd3a6b2c0",
// 	"firstName":"Acevedo",
// 	"lastName":"Poole",
// 	"username":"APoole",
// 	"password":"-0.5203957959239598",
// 	"isActive":true,
// 	"isEntryAdmin":false,
// 	"isListAdmin":false,
// 	"isLocationManager":false,
// 	"isOperatorAdmin":false,
// 	"isUserAdmin":true,

// }

// console.log(userPassesConstraintValidation(user))