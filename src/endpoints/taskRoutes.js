import { Router } from "express";
import TaskController from "../controllers/tasksController";
import auth from "../middleware/auth";

const router = Router();

router.post("/", auth, TaskController.registerTask);

router.get("/", auth, TaskController.getAllTasks);

router.get("/new", auth, TaskController.getAllTasksNew);

router.get("/progress", auth, TaskController.getAllTasksINProgress);

router.get("/complete", auth, TaskController.getAllTasksComplete);

router.get("/:task_id", auth, TaskController.getSingleTask);

router.put("/:task_id", auth, TaskController.updateTaskOnce);

router.delete("/:task_id", auth, TaskController.deleteTask);

router.patch("/:task_id", auth, TaskController.changeAssignee);

router.patch("/supervisor/:task_id", auth, TaskController.changeSupervisor);

router.put("/progress/update", auth, TaskController.updateProgress);

export default router;
