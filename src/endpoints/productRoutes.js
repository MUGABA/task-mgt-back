import { Router } from "express";
import ProductController from "../controllers/productController";
import auth from "../middleware/auth";

const router = Router();

router.post("/add-product", auth, ProductController.createNewProduct);

router.get("/view", auth, ProductController.getAllProduct);

export default router;
