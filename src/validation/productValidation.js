import Joi from "joi";

const ValidateProduct = {
  validateProductCreation(rowData) {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      created_by: Joi.number().required(),
      manager: Joi.number().required(),
    });
    return schema.validate(rowData);
  },
};

export default ValidateProduct;
