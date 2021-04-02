const Joi = require("joi").extend(require("@joi/date"));

const ValidateTasks = {
  validateNewTask(rowData) {
    const schema = Joi.object().keys({
      title: Joi.string().required(),
      start_date: Joi.date().format("DD/MM/YYYY"),
      end_date: Joi.date().format("DD/MM/YYYY"),
      assign: Joi.number(),
      supervisor: Joi.number(),
      complete: Joi.number(),
    });

    return schema.validate(rowData);
  },

  ValidateChangeAssign(rowData) {
    const schema = Joi.object().keys({
      assign: Joi.number().required(),
    });

    return schema.validate(rowData);
  },
  ValidateChangeSupervisor(rowData) {
    const schema = Joi.object().keys({
      supervisor: Joi.number().required(),
    });

    return schema.validate(rowData);
  },

  ValidateUpdateProgress(rowData) {
    const schema = Joi.object().keys({
      complete: Joi.number().required(),
    });

    return schema.validate(rowData);
  },
};

export default ValidateTasks;
