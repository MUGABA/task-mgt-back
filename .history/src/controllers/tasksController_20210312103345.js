import _ from 'lodash';

import validate from '../validation/validateTasks';


const TaskController = {
    async registerTask(req,res){
        const task = 
        _.pick(req.body, ["title","start_date","end_date","deliverables","assign","supervisor","complete"]);

        const { error} = await validate.validateNewTask(task);
        if(error) return res.status(400).send({status:400,message:error.details[0].message});
    }
}



export default TaskController;