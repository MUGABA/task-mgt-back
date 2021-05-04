import { Router } from "express";

import Role from "../controllers/rolesController";
import auth from "../middleware/auth";

const router = Router();

router.post("/roles", auth, Role.createRoles);

router.get("/roles", auth, Role.getAllRoles);

export default router;
