import joi, { ObjectSchema} from "joi";

enum Roles {
    ADMIN = "ADMIN",
    USER = "USER",
}

export const registerUserSchema: ObjectSchema = joi.object().keys({
    username: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
});