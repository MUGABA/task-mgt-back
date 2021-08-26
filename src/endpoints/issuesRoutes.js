import { Router } from "express";
import IssuesController from "../controllers/issuesContoller";
import auth from "../middleware/auth";

const router = Router();

router.post("/add-issue", auth, IssuesController.createNewProductIssue);

router.get("/view", auth, IssuesController.getAllIssues);

router.get("/view-product/:id", auth, IssuesController.getAllIssuesOnProduct);

router.get("/new", auth, IssuesController.getAllIssuesInNewState);

router.get("/progress", auth, IssuesController.getAllIssuesInProgressState);

router.get("/complete", auth, IssuesController.getAllCompleteIssues);

export default router;
