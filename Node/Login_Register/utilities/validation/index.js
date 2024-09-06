import { emailSchema } from "./emailSchema.valid.js";
import { loginSchema } from "./loginSchema.valid.js";
import { passwordSchema } from "./passwordSchema.valid.js";
import { registerSchema } from "./registerSchema.valid.js";

export const loginValidation = {
    registerSchema,
    loginSchema,
    emailSchema,
    passwordSchema
}