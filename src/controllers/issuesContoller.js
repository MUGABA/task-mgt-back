import _ from "lodash";
import AuthModal from "../database/models/authModel";
import IssueModal from "../database/models/issuesModel";
import ProductModal from "../database/models/productsModel";
import validate from "../validation/issuesValidation";

const IssuesController = {
  async getAllIssues(req, res) {
    const allIssues = await IssueModal.getAllIssues();

    if (!allIssues.length)
      return res
        .status(404)
        .send({ status: 404, message: "No Issues yet", data: [] });

    return res.status(200).send({ status: 200, data: allIssues });
  },
  async createNewProductIssue(req, res) {
    let issue = _.pick(req.body, [
      "title",
      "description",
      "product_id",
      "assigned_user",
      "rating",
    ]);

    const { id } = req.user;

    issue = {
      ...issue,
      created_by: id,
    };

    //handling errors in the returned object.
    const { error } = await validate.validateIssueCreation(issue);
    if (error)
      return res
        .status(400)
        .send({ status: 400, message: error.details[0].message });

    // check whether the product is their
    const checkProductAvailable = await ProductModal.getProductById(
      issue.product_id
    );
    if (!checkProductAvailable.length)
      return res.status(404).send({
        status: 404,
        message: "Product you have selected does not exists",
      });

    // check whether assign is already available
    const checkAssignAvailability = await AuthModal.checkUserWithId(
      issue.assigned_user
    );
    if (!checkAssignAvailability.length)
      return res.status(404).send({
        status: 404,
        message: "Assigned User is not available or the left",
      });

    const createIssue = await IssueModal.createNewProductIssue(issue);
    return res.status(201).send({
      status: 201,
      message: "Issue created successfully",
      data: createIssue[0],
    });
  },

  async getAllIssuesOnProduct(req, res) {
    const productId = req.params.id;

    // check whether the product is their
    const checkProductAvailable = await ProductModal.getProductById(productId);
    if (!checkProductAvailable.length)
      return res.status(404).send({
        status: 404,
        message: "Product you have selected does not exists",
      });

    const getIssues = await IssueModal.getAllIssuesOnProduct(productId);
    if (!getIssues.length)
      return res
        .status(200)
        .send({ status: 404, message: "No Issues on this product yet" });

    return res.status(200).send({ status: 200, data: getIssues });
  },

  async getAllIssuesInNewState(req, res) {
    const allNewIssues = await IssueModal.getAllIssuesInNewState();

    if (!allNewIssues.length)
      return res
        .status(200)
        .send({ status: 404, message: "No Issues yet", data: [] });

    return res.status(200).send({ status: 200, data: allNewIssues });
  },

  async getAllIssuesInProgressState(req, res) {
    const allProgressIssues = await IssueModal.getAllIssuesInProgressState();

    if (!allProgressIssues.length)
      return res
        .status(404)
        .send({ status: 404, message: "No Issues yet", data: [] });

    return res.status(200).send({ status: 200, data: allProgressIssues });
  },

  async getAllCompleteIssues(req, res) {
    const allCompleteIssues = await IssueModal.getAllIssuesInCompleteState();

    if (!allCompleteIssues.length)
      return res
        .status(200)
        .send({ status: 404, message: "No Issues yet", data: [] });

    return res.status(200).send({ status: 200, data: allCompleteIssues });
  },

  async getSingleIssue(req, res) {
    const issueId = req.params.issue_id;

    const checkWhetherTheIssueIsAvailable = await IssueModal.getIssueById(
      issueId
    );

    if (!checkWhetherTheIssueIsAvailable.length)
      return res.status(404).send({ status: 404, message: "Issue not found" });

    return res
      .status(200)
      .send({ status: 200, data: checkWhetherTheIssueIsAvailable[0] });
  },

  async updateIssueOnce(req, res) {
    const issue = _.pick(req.body, [
      "title",
      "description",
      "product_id",
      "assigned_user",
      "rating",
    ]);

    const issueId = req.params.issue_id;

    //handling errors in the returned object.
    const { error } = await validate.validateIssueUpdate(issue);
    if (error)
      return res
        .status(400)
        .send({ status: 400, message: error.details[0].message });

    const checkProductAvailable = await ProductModal.getProductById(
      issue.product_id
    );
    if (!checkProductAvailable.length)
      return res.status(404).send({
        status: 404,
        message: "Product you have selected does not exists",
      });

    // check whether assign is already available
    const checkAssignAvailability = await AuthModal.checkUserWithId(
      issue.assigned_user
    );
    if (!checkAssignAvailability.length)
      return res.status(404).send({
        status: 404,
        message: "Assigned User is not available or the left",
      });

    const response = await IssueModal.updateIssue(issue, issueId);
    console.log(response);
    return res
      .status(200)
      .send({ status: 200, message: "Issue updated successfully" });
  },

  async updateStatusOfTheIssue(req, res) {
    const issue = _.pick(req.body, ["id", "status"]);

    if (!issue.id || !issue.status)
      return res
        .status(400)
        .send({ status: 400, message: "Issue or status must be provided" });

    const checkWhetherTheIssueIsAvailable = await IssueModal.getIssueById(
      issue.id
    );

    if (!checkWhetherTheIssueIsAvailable.length)
      return res.status(404).send({ status: 404, message: "Issue not found" });

    await IssueModal.updateIssueStatus(issue);

    return res
      .status(200)
      .send({ status: 200, message: "Status updated successfully" });
  },
};

export default IssuesController;
