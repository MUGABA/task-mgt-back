import Joi from "joi";

const ValidateRole = {
    validateInput(rowData) {
        const schema = Joi.object().keys({
            role: Joi.string().required(),
        });
        return schema.validate(rowData);
    },
};

export default ValidateRole;