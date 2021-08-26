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
    console.log("we reached here", createIssue);
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
};

export default IssuesController;
