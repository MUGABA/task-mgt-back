import _ from "lodash";
import Auth from "../database/models/authModel";
import ProductModel from "../database/models/productsModel";
import validate from "../validation/productValidation";

const ProductController = {
  async getAllProduct(req, res) {
    const products = await ProductModel.getAllProducts();
    if (!products.length) {
      return res
        .status(404)
        .send({ status: 404, data: [], message: "No Products yet" });
    }
    return res.status(200).send({ status: 200, data: products });
  },
  async createNewProduct(req, res) {
    let product = _.pick(req.body, ["product_name"]);

    const { id } = req.user;

    product = {
      ...product,
      created_by: id,
    };

    // validation
    const { error } = await validate.validateProductCreation(product);
    if (error)
      return res
        .status(400)
        .send({ status: 200, message: error.details[0].message });

    // check whether the user exists
    const assignedUser = await Auth.checkUserWithId(id);
    if (!assignedUser.length)
      return res
        .status(404)
        .send({ status: 404, message: "selected user is no longer available" });

    // now create the product already...
    console.log("we reached here ");
    const createdProduct = await ProductModel.createNewProduct(product);
    console.log(createdProduct);
    return res.status(200).send({ status: 200, data: createdProduct[0] });
  },
};

export default ProductController;
