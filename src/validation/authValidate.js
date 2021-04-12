import Joi from "joi";

const ValidateUser = {
  validateInput(rowData) {
    const schema = Joi.object().keys({
      email: Joi.string().required(),
      username: Joi.string().required(),
      user_password: Joi.string().alphanum().min(6).max(20),
      contact: Joi.string().required(),
      user_role: Joi.number(),
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
  validateChangePassword(rowData) {
    const schema = Joi.object().keys({
      email: Joi.string().required(),
      new_password: Joi.string().alphanum().min(6).max(20),
    });
    return schema.validate(rowData);
  },
  validateUSerUpdate(rowData) {
    const schema = Joi.object().keys({
      email: Joi.string(),
      username: Joi.string(),
      contact: Joi.string(),
      user_role: Joi.number(),
    });
    return schema.validate(rowData);
  },
};

export default ValidateUser;
