const Joi = require("joi").extend(require("@joi/date"));

const ValidateTasks = {
  validateNewTask(rowData) {
    const schema = Joi.object().keys({
      title: Joi.string().required(),
      start_date: Joi.date(),
      end_date: Joi.date(),
      assign: Joi.number(),
      supervisor: Joi.number(),
      complete: Joi.number().allow(null),
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
      task_id: Joi.number().required(),
      status: Joi.string().required().valid("new", "progress", "complete"),
    });

    return schema.validate(rowData);
  },
};

export default ValidateTasks;
