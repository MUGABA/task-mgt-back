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
  updateSupervisor(superId, taskId) {
    return new Promise(async (reject, resolve) => {
      const queryText = `UPDATE tasks SET supervisor = $1 WHERE task_id = $2;`;

      await db.query(queryText, [superId, taskId], (err, res) => {
        if (!err) {
          return resolve(res);
        }
        return reject(err);
      });
    })
      .then((res) => res)
      .catch((e) => e);
  },

  getAllTasks() {
    return new Promise(async (reject, resolve) => {
      const queryText = `select 
        t.task_id as id,
        t.start_date as start_date,
        t.end_date as end_date,
        t.deliverables as deliverables,
        u.username as executed_by,
        us.username as supervisor,
        use.username as created_by,
        t.complete as completed
        from tasks t 
        join users u
        on u.user_id = t.assign
        join users us
        on us.user_id=t.supervisor
        join users use
        on use.user_id=t.creator;`;

      await db.query(queryText, (err, res) => {
        if (!err) {
          const { rows } = res;
          return resolve(rows);
        }
      });
    });
  },
};

export default TasksModel;
