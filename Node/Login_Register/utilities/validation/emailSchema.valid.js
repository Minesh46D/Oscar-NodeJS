import Joi from "joi";


export const emailSchema = Joi.object({
    email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com' , 'co' , 'net'], deny: ['org'] } }),
})