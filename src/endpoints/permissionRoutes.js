import { Router } from "express";

import PermissionController from "../controllers/permissions";
import auth from "../middleware/auth";

const router = Router();

router.get("/permissions", auth, PermissionController.fetchAllPermissions);

router.post("/permissions/:role_id", auth, PermissionController.givePermission);

export default router;
