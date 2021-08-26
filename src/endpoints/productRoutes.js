import { Router } from "express";
import ProductController from "../controllers/productController";
import auth from "../middleware/auth";

const router = Router();

router.post("/add-product", auth, ProductController.createNewProduct);

router.get("/view", ProductController.getAllProduct);

export default router;
