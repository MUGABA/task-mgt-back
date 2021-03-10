import Joi from "joi";


const ValidateUser = {
    validateInput(rowData) {
        const schema = Joi.object().keys({
            role: Joi.string().required(),
        });
        return schema.validate(rowData);
    },
}