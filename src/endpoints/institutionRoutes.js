import { Router } from "express";
import InstitutionController from "../controllers/institutionContraller";

import auth from "../middleware/auth";

const router = Router();

router.post("/institutions", auth, InstitutionController.createAnInstitution);

export default router;
