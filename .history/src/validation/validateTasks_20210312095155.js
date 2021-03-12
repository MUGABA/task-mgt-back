import Joi from "joi";


const ValidateTasks = {
    validateNewTask(rowData){
        const schema = Joi.object().keys({
            title: Joi.string().required(),
            start_date: Joi.date(),
            end_date: Joi.date(),
            deliverables : Joi.string().required(),
            assign: Joi.number(),
            supervisor: Joi.number()
        })

        return schema.validate(rowData);
    }
}

export default ValidateTasks;