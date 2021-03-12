import db from "../connections/connection"


const TasksModel = {
    createTask(rowData){
        return new Promise(async (reject,resolve)=>{
            const queryText = `INSERT INTO tasks (title,start_date, end_date,deliverables,assign,supervisor,creator,complete)
            values `

        })
    }
}