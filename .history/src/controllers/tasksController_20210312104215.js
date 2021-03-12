import _ from 'lodash';
import TasksModel from '../database/models/tasksModels';

import validate from '../validation/validateTasks';



const TaskController = {
    async registerTask(req,res){
        const task = 
        _.pick(req.body, ["title","start_date","end_date","deliverables","assign","supervisor","complete"]);

        const { error} = await validate.validateNewTask(task);
        if(error) return res.status(400).send({status:400,message:error.details[0].message});

        // get the current user

        const currentUser = req.user;
        const { user_id} = currentUser;

        const createTask = await TasksModel.createTask(task, user_id )

        return res.status(201).send({status:201, data: createTask, message:"Task created successfully"})
        // insert the task to the database table
    }
}



export default TaskController;