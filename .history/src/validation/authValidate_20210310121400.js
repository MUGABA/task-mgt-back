import Joi from "joi";


const ValidateUser = {
    validateInput(rowData) {
        const schema = Joi.object().keys({
            email: Joi.string().required(),
            username: Joi.string.required(),
            password: Joi.string().alphanum().min(6).max(20),
            contact,
            position,
            role,
            level
        });
        return schema.validate(rowData);
    },
}