import _ from "lodash";
import TasksModel from "../database/models/tasksModels";
import AuthModel from "../database/models/authModel";

import validate from "../validation/validateTasks";

const TaskController = {
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

    const checkAssign = await AuthModel.checkUserWithId(assign.assign);
    if (!checkAssign.length) {
      return res.status(400).send({
        status: 400,
        message: "Someone your trying to assign a task does not exist",
      });
    }

    // update the the assign id that references the users table
  },
};

export default TaskController;
