import Joi from 'joi'

const userError = {
    password: {
        'string.pattern.base': 'Password must be at least one number, one letter and at least 8 characters'
    },
    confirmPassword: new Error('Both Password must be the same'),
}

export const passwordSchema = Joi.object({
    newPassword: Joi.string()
        .required()
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
        .messages(userError.password),
    confirmPassword: Joi.string()
        .required()
        .valid(Joi.ref('newPassword'))
        .error(userError.confirmPassword),
    oldPassword: Joi.string()
})