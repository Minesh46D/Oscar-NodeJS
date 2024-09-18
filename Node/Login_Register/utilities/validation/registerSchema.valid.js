import Joi from 'joi'

const userError = {
    userName: {
        'any.required': 'userName is Empty',
        'string.min': 'userName must be at least 3 letters',
        'string.max': 'userName must be less than 20 letters'
    },
    password: {
        'string.pattern.base': 'Password must be at least one number, one letter and at least 8 characters'
    },
    confirmPassword: new Error('Both Password must be the same'),
    phone_no: {
        'string.pattern.base': 'Phone number must be a valid international phone number format, e.g., +1234567890.'
    },
    gender: {
        'any.required': 'Gender is required',
        'string.valid': 'Gender must be one of the following: Male, Female, or Others.'
    }
}

export const registerSchema = Joi.object({
    userName: Joi.string()
        .required()
        .alphanum()
        .min(3)
        .max(20)
        .messages(userError.userName),
    email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com' , 'co' , 'net'], deny: ['org'] } }),
    password: Joi.string()
        .required()
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
        .messages(userError.password),
    confirmPassword: Joi.string()
        .required()
        .valid(Joi.ref('password'))
        .error(userError.confirmPassword),
    phone_no: Joi.string()
        .pattern(/^[+]?[1-9]\d{1,14}$/) // Example pattern for international phone numbers
        .message(userError.phone_no),
    firstName: Joi.string()
        .required()
        .max(12),
    lastName: Joi.string()
        .required()
        .max(12),
    gender: Joi.string()
        .required()
        .valid('Male', 'Female', 'Others')
        .messages(userError.gender),
    ref_Code: Joi.string()
        .allow('')
})