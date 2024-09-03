import Joi from "joi";

const userError = {
    userName: {
        'any.required': 'Username is Empty',
        'string.min': 'userName must be at least 3 letters',
        'string.max': 'userName must be less than 20 letters'
    },
    password: {
        'string.pattern.base': 'Password must be at least one number, one letter and at least 8 characters'
    }
}

export const loginSchema = Joi.object({
    userName: Joi.string()
        .required()
        .min(3)
        .max(20)
        .messages(userError.userName),
    password: Joi.string()
        .required()
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
        .messages(userError.password)
})  