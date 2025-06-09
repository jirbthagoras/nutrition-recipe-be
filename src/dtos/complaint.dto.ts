import joi, { ObjectSchema } from "joi";

export const makeComplaintSchema: ObjectSchema = joi.object().keys({
     complaint: joi.string().min(30).required()
});