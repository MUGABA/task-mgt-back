import db from "../connections/connection";

const TasksModel = {
  createTask(rowData, currentUser) {
    return new Promise(async (reject, resolve) => {
      const queryText = `INSERT INTO tasks(title,start_date, end_date,deliverables,assign,supervisor,creator,complete)
            values(
                '${rowData.title}',
                '${rowData.start_date}',
                '${rowData.end_date}',
                '${rowData.deliverables}',
                '${rowData.assign}',
                '${rowData.supervisor}',
                '${currentUser}',
                '${rowData.complete}'
            ) RETURNING *;`;
      await db.query(queryText, (err, res) => {
        if (!err) {
          const { rows } = res;
          console.log(rows);
          return resolve(rows);
        } else {
          console.log(err);
          return reject(err);
        }
      });
    })
      .then((res) => res)
      .catch((e) => e);
  },
  findTaskById(taskId) {
    return new Promise(async (reject, resolve) => {
      const queryText = "SELECT * FROM tasks WHERE task_id = $1;";

      await db.query(queryText, [taskId], (err, res) => {
        if (!err) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    })
      .then((res) => res)
      .catch((e) => e);
  },

  updateAssign(assignId, taskId) {
    return new Promise(async (reject, resolve) => {
      const queryText = `UPDATE tasks SET assign = $1 WHERE task_id = $2;`;

      await db.query(queryText, [assignId, taskId], (err, res) => {
        if (!err) {
          return resolve(res);
        }
        return reject(err);
      });
    })
      .then((res) => res)
      .catch((e) => e);
  },
};

export default TasksModel;
