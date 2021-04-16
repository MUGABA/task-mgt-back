import { Router } from "express";

import auth from "../middleware/auth";
import ProjectControls from "../controllers/projectController";

const router = Router();

router.post("/projects", auth, ProjectControls.createProject);

router.get("/projects", auth, ProjectControls.getAllProjects);

router.put("/projects/:project_id", auth, ProjectControls.updateProjectName);

export default router;
