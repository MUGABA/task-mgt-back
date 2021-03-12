import { Router } from "express";

import auth from "../middleware/auth";
import TaskController from "../controllers/tasksController";

const router = Router();

router.post("/tasks", auth, TaskController.registerTask);

router.get("/tasks", auth, TaskController.getAllTasks);

router.patch("/tasks/:task_id", auth, TaskController.changeAssignee);

router.patch(
  "/tasks/supervisor/:task_id",
  auth,
  TaskController.changeSupervisor
);

router.patch("/tasks/progress/:task_id", auth, TaskController.updateProgress);

export default router;
