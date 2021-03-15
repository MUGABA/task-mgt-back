import { Router } from "express";

import auth from "../middleware/auth";
import Comment from "../controllers/commentContoller";

const router = Router();

router.post("/comment/:task_id", auth, Comment.createComment);

router.get("/comment/:task_id", auth, Comment.fetchAllcommentsOnATask);

router.delete("/comment/:comment_id", auth, Comment.deleteComment);

export default router;
