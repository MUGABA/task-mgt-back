import _ from "lodash";
import TasksModel from "../database/models/tasksModels";
import AuthModel from "../database/models/authModel"

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

    // get the current user
    // check whether the assign is available
    const checkAssign = await AuthModel.checkUserWithId(task.assign);
    if(!checkAssign.length) return res.status(400).send({status:400,message:"Someone your trying to assign a task does not exist"})
    // check whether the supervisor is available in the system..

    const { user_id } = currentUser;

    const createTask = await TasksModel.createTask(task, user_id);

    return res
      .status(201)
      .send({
        status: 201,
        data: createTask,
        message: "Task created successfully",
      });
    // insert the task to the database table
  },
};

export default TaskController;
