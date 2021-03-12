import { Router } from "express";

import auth from "../middleware/auth";
import TaskController from "../controllers/tasksController";

const router = Router();

router.post("/tasks", auth, TaskController.registerTask);

router.patch("/tasks/:task_id", auth, TaskController.changeAssignee);

export default router;
