import { Router } from "express";

import PermissionController from "../controllers/permissions";
import auth from "../middleware/auth";

const router = Router();

router.get("/permissions", auth, PermissionController.fetchAllPermissions);

router.post("/permissions/:role_id", auth, PermissionController.givePermission);

router.get(
  "/permissions/:role_id",
  auth,
  PermissionController.fetchAllPermissionsOnARole
);

router.get(
  "/permissions/:role_id/not",
  auth,
  PermissionController.fetchPermissionsNotForROle
);

router.delete(
  "/permissions/:role_id/:permission_id",
  auth,
  PermissionController.revokePermission
);

export default router;
