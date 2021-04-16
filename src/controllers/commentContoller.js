import _ from "lodash";

import validate from "../validation/validateComment";
import Task from "../database/models/tasksModels";
import Comment from "../database/models/commentsModel";

const CommentController = {
  async createComment(req, res) {
    const comment = _.pick(req.body, ["comment"]);
    const taskId = req.params.task_id;
    const currentUser = req.user;

    const { error } = await validate.validateComment(comment);
    if (error) {
      return res
        .status(404)
        .send({ status: 404, message: error.details[0].message });
    }

    const checkTaskAvailable = await Task.findTaskById(taskId);
    if (!checkTaskAvailable.length) {
      return res.status(404).send({
        status: 404,
        message: "Task your commenting on is no longer available",
      });
    }
    // destructuring off the the current id that we neet
    const { id } = currentUser;
    // creating new object to be passed to the insert function
    const obj = {
      task: taskId,
      commenter: id,
      comment: comment.comment,
    };

    const create = await Comment.writeAComment(obj);

    return res.status(201).send({
      status: 201,
      data: create,
      message: "Comment created successfully",
    });
  },

  async fetchAllCommentsOnATask(req, res) {
    const taskId = req.params.task_id;

    const checkTaskAvailable = await Task.findTaskById(taskId);
    if (!checkTaskAvailable.length) {
      return res.status(404).send({
        status: 404,
        message: "Task your commenting on is no longer available",
      });
    }

    const getThem = await Comment.getAllCommentsOnTask(taskId);
    if (getThem.length === 0) {
      return res
        .status(400)
        .send({ status: 400, message: "Task no Comments yet", data: [] });
    }

    return res.status(200).send({ status: 200, data: getThem });
  },

  async deleteComment(req, res) {
    const commentId = req.params.comment_id;

    // find out whether the comment is available
    const checkComment = await Comment.getCommentById(commentId);
    if (!checkComment.length) {
      return res
        .status(404)
        .send({ status: 404, message: "Comment not available" });
    }

    await Comment.deleteComment(commentId);

    return res
      .status(200)
      .send({ status: 200, message: "Comment Deleted successfully" });
  },
};

export default CommentController;
