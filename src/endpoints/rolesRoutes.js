import { Router } from "express";

import Role from "../controllers/rolesController";

const router = Router();

router.post("/roles", Role.createRoles);

router.get("/roles", Role.getAllRoles);

export default router;
