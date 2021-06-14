import Joi from "joi";

const ValidateProject = {
  validateInput(rowData) {
    const schema = Joi.object().keys({
      project_name: Joi.string().required(),
    });
    return schema.validate(rowData);
  },
};

export default ValidateProject;
