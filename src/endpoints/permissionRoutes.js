import { Router } from "express";
import PermissionController from "../controllers/permissions";
import auth from "../middleware/auth";

const router = Router();

router.post("/", auth, PermissionController.addNewPermission);

router.get("/", auth, PermissionController.fetchAllPermissions);

router.post("/:role_id", auth, PermissionController.givePermission);

router.get("/:role_id", auth, PermissionController.fetchAllPermissionsOnARole);

router.get(
  "/:role_id/not",
  auth,
  PermissionController.fetchPermissionsNotForROle
);

router.delete(
  "/:role_id/:permission_id",
  auth,
  PermissionController.revokePermission
);

export default router;
