import { Router } from "express";
import InstitutionController from "../controllers/institutionContraller";

import upload from "../mult";

import auth from "../middleware/auth";

const router = Router();

var cpUpload = upload.fields([
  { name: "sasula_letter", maxCount: 1 },
  { name: "document", maxCount: 8 },
]);

router.post(
  "/institutions",
  [auth, cpUpload],
  InstitutionController.createAnInstitution
);

router.post(
  "/institutions/types",
  auth,
  InstitutionController.createAnInstitutionType
);
router.get(
  "/institutions/types",
  auth,
  InstitutionController.getAllAvailableInstitutionType
);

export default router;
