import Joi from "joi";

const ValidateProduct = {
  validateProductCreation(rowData) {
    const schema = Joi.object().keys({
      product_name: Joi.string().required(),
      created_by: Joi.number().required(),
    });
    return schema.validate(rowData);
  },
};

export default ValidateProduct;
