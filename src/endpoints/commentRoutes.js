import { Router } from "express";
import Comment from "../controllers/commentContoller";
import auth from "../middleware/auth";

const router = Router();

router.post("/:task_id", auth, Comment.createComment);

router.get("/:task_id", auth, Comment.fetchAllCommentsOnATask);

router.delete("/:comment_id", auth, Comment.deleteComment);

export default router;
