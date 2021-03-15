import Joi from "joi";

const ValidateUser = {
  validateInput(rowData) {
    const schema = Joi.object().keys({
      email: Joi.string().required(),
      username: Joi.string().required(),
      password: Joi.string().alphanum().min(6).max(20),
      contact: Joi.string().required(),
      position: Joi.number(),
      role: Joi.number(),
      level: Joi.string().required(),
    });
    return schema.validate(rowData);
  },
  validateLogin(rowData) {
    const schema = Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().alphanum().min(6).max(20),
    });
    return schema.validate(rowData);
  },
};

export default ValidateUser;