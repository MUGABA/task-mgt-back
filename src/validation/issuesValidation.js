import Joi from "joi";

const ValidateProduct = {
  validateIssueCreation(rowData) {
    const schema = Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      product_id: Joi.number().required(),
      created_by: Joi.number().required(),
      assigned_user: Joi.number().required(),
      rating: Joi.number().min(0).max(3).required(),
    });
    return schema.validate(rowData);
  },
};

export default ValidateProduct;
