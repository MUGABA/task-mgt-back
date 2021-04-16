import Joi from "joi";

const ValidateInstitution = {
  validateInput(rowData) {
    const schema = Joi.object().keys({
      institution_name: Joi.string().required(),
    });
    return schema.validate(rowData);
  },
};

export default ValidateInstitution;
