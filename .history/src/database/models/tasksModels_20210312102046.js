import db from "../connections/connection"


const TasksModel = {
    createTask(rowData, currentUser){
        return new Promise(async (reject,resolve)=>{
            const queryText = `INSERT INTO tasks (title,start_date, end_date,deliverables,assign,supervisor,creator,complete)
            values (
                '${rowData.title}',
                '${rowData.start_date}',
                '${rowData.deliverables}',
                '${rowData.assign}',
                '${rowData.supervisor}',
                '${currentUser}',
                '${rowData.complete}'
            );`
            await db.query(queryText, (err,res)=>{
                if(!err){
                    const { rows } = res
                    return rows
                }
                return err
            });
        }).then(res=>res).catch(e=>e)
    }
}