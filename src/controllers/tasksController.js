import _ from "lodash";
import AuthModel from "../database/models/authModel";
import TasksModel from "../database/models/tasksModels";
import validate from "../validation/validateTasks";

const TaskController = {
  async getAllTasks(req, res) {
    const getAllTasks = await TasksModel.getAllTasks();

    if (!getAllTasks.length) {
      return res
        .status(200)
        .send({ status: 200, message: "No tasks yet.", data: [] });
    }

    return res.status(200).send({ status: 200, data: getAllTasks });
  },

  async getAllTasksNew(req, res) {
    const getAllTasks = await TasksModel.getAllTasksNew();

    if (!getAllTasks.length) {
      return res
        .status(200)
        .send({ status: 200, message: "No tasks yet.", data: [] });
    }

    return res.status(200).send({ status: 200, data: getAllTasks });
  },

  async getAllTasksINProgress(req, res) {
    const getAllTasks = await TasksModel.getAllTasksInProgress();

    if (!getAllTasks.length) {
      return res
        .status(200)
        .send({ status: 200, message: "No tasks yet.", data: [] });
    }

    return res.status(200).send({ status: 200, data: getAllTasks });
  },

  async getAllTasksComplete(req, res) {
    const getAllTasks = await TasksModel.getAllTasksComplete();

    if (!getAllTasks.length) {
      return res
        .status(200)
        .send({ status: 200, message: "No tasks yet.", data: [] });
    }

    return res.status(200).send({ status: 200, data: getAllTasks });
  },

  async registerTask(req, res) {
    const task = _.pick(req.body, [
      "title",
      "start_date",
      "end_date",
      "assign",
      "supervisor",
      "status",
    ]);

    const { id } = req.user;

    const startDate = new Date(task.start_date);
    const finishDate = new Date(task.end_date);

    if (startDate > finishDate)
      return res
        .status(400)
        .send({ status: 400, message: "Start date must before end date" });

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

    const createTask = await TasksModel.createTask(task, id);

    return res.status(201).send({
      status: 201,
      data: createTask,
      message: "Task created successfully",
    });
  },

  async updateProgress(req, res) {
    const progress = _.pick(req.body, ["status", "task_id"]);

    const currentUser = req.user;

    const { error } = await validate.ValidateUpdateProgress(progress);
    if (error) {
      return res
        .status(400)
        .send({ status: 400, message: error.details[0].message });
    }

    const checkTaskAvailable = await TasksModel.findTaskById(progress.task_id);
    if (!checkTaskAvailable.length) {
      return res
        .status(404)
        .send({ status: 404, message: "Task does not exist" });
    }

    const { id } = currentUser;
    const { assign } = checkTaskAvailable[0];

    if (id !== assign) {
      return res.status(400).send({
        status: 400,
        message:
          "Your not allowed to update a tasks progress your not assigned to",
      });
    }

    await TasksModel.updateProgress(progress.status, progress.task_id);

    return res
      .status(200)
      .send({ status: 200, message: "Progress update successfully" });
  },

  async deleteTask(req, res) {
    const taskId = req.params.task_id;

    const checkTaskAvailable = await TasksModel.findTaskById(taskId);
    if (!checkTaskAvailable.length) {
      return res
        .status(404)
        .send({ status: 404, message: "Task does not exist" });
    }

    await TasksModel.deleteATask(taskId);

    return res
      .status(200)
      .send({ status: 200, message: "Task deleted successfully" });
  },

  async updateTaskOnce(req, res) {
    const taskId = req.params.task_id;

    const task = _.pick(req.body, [
      "title",
      "start_date",
      "end_date",
      "assign",
      "supervisor",
      "status",
    ]);

    const currentUser = req.user;

    const { error } = await validate.validateNewTask(task);
    if (error)
      return res
        .status(400)
        .send({ status: 400, message: error.details[0].message });

    const checkTaskAvailable = await TasksModel.findTaskById(taskId);
    if (!checkTaskAvailable.length) {
      return res
        .status(404)
        .send({ status: 404, message: "Task does not exist" });
    }

    const { id } = currentUser;
    const { assign, supervisor } = checkTaskAvailable[0];

    // if (id !== assign || id !== supervisor) {
    //   return res.status(401).send({
    //     status: 401,
    //     message: "You must assignee or supervisor to update the task ",
    //   });
    // }

    const response = await TasksModel.updateTaskOnce(taskId, task);

    return res.status(200).send({
      status: 200,
      message: "Your the task has been updated successfully",
    });
  },
  async getSingleTask(req, res) {
    const taskId = req.params.task_id;

    const getTask = await TasksModel.fetchSingleTask(taskId);

    if (!getTask.length) {
      return res.status(404).send({
        status: 404,
        message: "Task is not available find another one",
      });
    }
    return res.status(200).send({ status: 200, data: getTask[0] });
  },
};

export default TaskController;
