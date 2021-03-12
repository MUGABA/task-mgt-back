import _ from 'lodash';

import validate from '../validation/validateTasks';


const TaskController = {
    async registerTask(req,res){
        const task = 
        _.pick(req.body, ["title","start_date","end_date","deliverables","assign","supervisor","complete"]);

        
    }
}

