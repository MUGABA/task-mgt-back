import Joi from "joi";

const ValidateInstitution = {
  validateInput(rowData) {
    const schema = Joi.object().keys({
      institution_name: Joi.string().required(),
      inst_district: Joi.string().required(),
      inst_region: Joi.string().required(),
      inst_account: Joi.string().required(),
      inst_type: Joi.number(),
      inst_gender: Joi.string().valid("Male", "Female").required(),
      use_sasula: Joi.bool().required(),
      sasula_code: Joi.string().required(),
    });
    return schema.validate(rowData);
  },

  validateTypeCreation(rowData) {
    const schema = Joi.object().keys({
      type_name: Joi.string().required(),
    });
    return schema.validate(rowData);
  },

  validateLeader(rowData) {
    const schema = Joi.object().keys({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().email(),
      leader_contact: Joi.string().required(),
      leader_location: Joi.string().required(),
    });
    return schema.validate(rowData);
  },
};

export default ValidateInstitution;
