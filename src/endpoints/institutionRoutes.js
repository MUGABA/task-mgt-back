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

router.get("/institutions", auth, InstitutionController.getAllInstitutions);

router.get(
  "/institutions/:id",
  auth,
  InstitutionController.fetchSingleInstitutionById
);

router.get(
  "/institutions/leaders/:id",
  auth,
  InstitutionController.fetchSingleInstitutionLeadersById
);

router.post(
  "/institutions/:name",
  InstitutionController.CreateInstitutionLeaders
);

router.post(
  "/institutions/types",
  auth,
  InstitutionController.createAnInstitutionType
);

router.get(
  "/institutions/types/all",
  auth,
  InstitutionController.getAllAvailableInstitutionTypes
);

router.put("/leader/:leader_id", auth, InstitutionController.UpdateALeader);

router.get(
  "/leader/:name",
  auth,
  InstitutionController.getAllLeadersOfAnInstitution
);
export default router;
