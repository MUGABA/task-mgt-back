import Joi from "joi";

const ValidateComment = {
  validateComent(rowData) {
    const schema = Joi.object().keys({
      comment: Joi.string().required(),
    });

    return schema.validate(rowData);
  },
};

export default ValidateComment;
