"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var Joi = require("joi");
exports.userSchema = Joi.object().keys({
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
    isUserAdmin: Joi.boolean().required()
});
function userPassesConstraintValidation(user) {
    return Joi.validate(__assign({}, user), exports.userSchema);
}
exports.userPassesConstraintValidation = userPassesConstraintValidation;
var user = {
    "id": "20b57c1a-892d-4b75-b926-e54dd3a6b2c0",
    "firstName": "Acevedo",
    "lastName": "Poole",
    "username": "APoole",
    "password": "-0.5203957959239598",
    "isActive": true,
    "isEntryAdmin": false,
    "isListAdmin": false,
    "isLocationManager": false,
    "isOperatorAdmin": false,
    "isUserAdmin": true
};
console.log(userPassesConstraintValidation(user));
