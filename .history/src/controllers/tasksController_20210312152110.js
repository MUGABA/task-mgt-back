import _ from "lodash";
import TasksModel from "../database/models/tasksModels";
import AuthModel from "../database/models/authModel";

import validate from "../validation/validateTasks";

const TaskController = {
  async getAllTasks(req, res) {
    const getAllTasks = await TasksModel.getAllTasks();
    if (getAllTasks.length === 0) {
      return res.status(204).send({ status: 204, message: "No tasks yet." });
    }

    return res.status(200).send({ status: 200, data: getAllTasks });
  },
  async registerTask(req, res) {
    const task = _.pick(req.body, [
      "title",
      "start_date",
      "end_date",
      "deliverables",
      "assign",
      "supervisor",
      "complete",
    ]);

    const currentUser = req.user;

    const { error } = await validate.validateNewTask(task);
    if (error)
      return res
        .status(400)
        .send({ status: 400, message: error.details[0].message });

    if (task.assign) {
      const checkAssign = await AuthModel.checkUserWithId(task.assign);

      if (!checkAssign.length) {
        return res.status(400).send({
          status: 400,

          message: "Someone your trying to assign a task does not exist",
        });
      }
    }

    if (task.supervisor) {
      const checkSupervisor = await AuthModel.checkUserWithId(task.supervisor);
      if (!checkSupervisor.length) {
        return res.status(400).send({
          status: 400,
          message: "Supervisor not available",
        });
      }
    }

    const { id } = currentUser;

    const createTask = await TasksModel.createTask(task, id);

    return res.status(201).send({
      status: 201,
      data: createTask,
      message: "Task created successfully",
    });
  },
  // This end point will help the user assign a person a task or change someone to work on the task.
  async changeAssignee(req, res) {
    const assign = _.pick(req.body, ["assign"]);

    const taskId = req.params.task_id;

    const { error } = await validate.ValidateChangeAssign(assign);
    if (error) {
      return res
        .status(400)
        .send({ status: 400, message: error.details[0].message });
    }

    // check the availability of the task to be update or it was deleted.

    const checkTaskAvailable = await TasksModel.findTaskById(taskId);
    if (!checkTaskAvailable.length) {
      return res
        .status(404)
        .send({ status: 404, message: "Task does not exist" });
    }

    const checkAssign = await AuthModel.checkUserWithId(assign.assign);
    if (!checkAssign.length) {
      return res.status(400).send({
        status: 400,
        message: "Someone your trying to assign a task does not exist",
      });
    }

    // update the the assign id that references the users table

    await TasksModel.updateAssign(assign.assign, taskId);

    return res
      .status(200)
      .send({ status: 200, message: "Assign update successfully" });
  },

  async changeSupervisor(req, res) {
    const supervisor = _.pick(req.body, ["supervisor"]);

    const taskId = req.params.task_id;

    const { error } = await validate.ValidateChangeSupervisor(supervisor);
    if (error) {
      return res
        .status(400)
        .send({ status: 400, message: error.details[0].message });
    }

    // check the availability of the task to be update or it was deleted.

    const checkTaskAvailable = await TasksModel.findTaskById(taskId);
    if (!checkTaskAvailable.length) {
      return res
        .status(404)
        .send({ status: 404, message: "Task does not exist" });
    }

    const checkAssign = await AuthModel.checkUserWithId(supervisor.supervisor);
    if (!checkAssign.length) {
      return res.status(404).send({
        status: 404,
        message: "The supervisor your assigning does not exist",
      });
    }

    // update the the assign id that references the users table

    await TasksModel.updateSupervisor(supervisor.supervisor, taskId);

    return res
      .status(200)
      .send({ status: 200, message: "Supervisor update successfully" });
  },

  async updateProgress(req, res) {
    const progress = _.pick(req.body, ["complete"]);

    const taskId = req.params.task_id;

    const { error } = await validate.ValidateUpdateProgress(progress);
    if (error) {
      return res
        .status(400)
        .send({ status: 400, message: error.details[0].message });
    }

    // check the availability of the task to be update or it was deleted.

    const checkTaskAvailable = await TasksModel.findTaskById(taskId);
    if (!checkTaskAvailable.length) {
      return res
        .status(404)
        .send({ status: 404, message: "Task does not exist" });
    }

    await TasksModel.updateProgress(progress.complete, taskId);

    return res
      .status(200)
      .send({ status: 200, message: "Progress update successfully" });
  },
};

export default TaskController;
