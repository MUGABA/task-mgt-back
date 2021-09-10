import db from "../connections/connection";

const TasksModel = {
  createTask(rowData, currentUser) {
    return new Promise(async (reject, resolve) => {
      const queryText = `INSERT INTO tasks(title,start_date, end_date,assign,supervisor,creator)
            values(
                '${rowData.title}',
                '${rowData.start_date}',
                '${rowData.end_date}',
                '${rowData.assign}',
                '${rowData.supervisor}',
                '${currentUser}'
            ) RETURNING *;`;
      await db.query(queryText, (err, res) => {
        if (!err) {
          const { rows } = res;

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
      const queryText = `select * from tasks where task_id=$1;`;

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

  updateProgress(status, taskId) {
    return new Promise(async (reject, resolve) => {
      const queryText = `UPDATE tasks SET status = $1 WHERE task_id = $2;`;

      await db.query(queryText, [status, taskId], (err, res) => {
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
        t.title as title,
        to_char(t.start_date,'YYYY-MM-DD') as start_date,
        to_char(t.end_date,'YYYY-MM-DD') as end_date,
        u.username as assign,
        us.username as supervisor,
        DATE_PART('day', "end_date"::timestamp - now()::timestamp) as remaining_days,
        use.username as created_by,
        t.status as status
        from tasks t 
        join users u
        on u.user_id = t.assign
        join users us
        on us.user_id=t.supervisor
        join users use
        on use.user_id=t.creator
        order by id;`;

      await db.query(queryText, (err, res) => {
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

  getAllTasksNew() {
    return new Promise(async (reject, resolve) => {
      const queryText = `select 
        t.task_id as id,
        t.title as title,
        to_char(t.start_date,'YYYY-MM-DD') as start_date,
        to_char(t.end_date,'YYYY-MM-DD') as end_date,
        u.username as assign,
        us.username as supervisor,
        DATE_PART('day', "end_date"::timestamp - now()::timestamp) as remaining_days,
        use.username as created_by,
        t.status as status
        from tasks t 
        join users u
        on u.user_id = t.assign
        join users us
        on us.user_id=t.supervisor
        join users use
        on use.user_id=t.creator
        where t.status = 'new'
        order by id desc;`;

      await db.query(queryText, (err, res) => {
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

  getAllTasksInProgress() {
    return new Promise(async (reject, resolve) => {
      const queryText = `select 
        t.task_id as id,
        t.title as title,
        to_char(t.start_date,'YYYY-MM-DD') as start_date,
        to_char(t.end_date,'YYYY-MM-DD') as end_date,
        u.username as assign,
        us.username as supervisor,
        DATE_PART('day', "end_date"::timestamp - now()::timestamp) as remaining_days,
        use.username as created_by,
        t.status as status
        from tasks t 
        join users u
        on u.user_id = t.assign
        join users us
        on us.user_id=t.supervisor
        join users use
        on use.user_id=t.creator
        where t.status = 'progress'
        order by id desc;`;

      await db.query(queryText, (err, res) => {
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

  getAllTasksComplete() {
    return new Promise(async (reject, resolve) => {
      const queryText = `select 
        t.task_id as id,
        t.title as title,
        to_char(t.start_date,'YYYY-MM-DD') as start_date,
        to_char(t.end_date,'YYYY-MM-DD') as end_date,
        u.username as assign,
        us.username as supervisor,
        DATE_PART('day', "end_date"::timestamp - now()::timestamp) as remaining_days,
        use.username as created_by,
        t.status as status
        from tasks t 
        join users u
        on u.user_id = t.assign
        join users us
        on us.user_id=t.supervisor
        join users use
        on use.user_id=t.creator
        where t.status='complete'
        order by t.task_id desc;`;

      await db.query(queryText, (err, res) => {
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

  deleteATask(taskId) {
    return new Promise(async (reject, resolve) => {
      const queryText = "DELETE FROM tasks WHERE task_id = $1;";

      await db.query(queryText, [taskId], (err, res) => {
        if (!err) {
          return resolve(res);
        }
        return reject(err);
      });
    })
      .then((res) => res)
      .catch((err) => err);
  },
  updateTaskOnce(taskId, rowData) {
    return new Promise(async (reject, resolve) => {
      const queryText = `
      UPDATE tasks SET title='${rowData.title}',
      start_date='${rowData.start_date}',
      end_date='${rowData.end_date}',
      assign='${rowData.assign}',
      supervisor='${rowData.supervisor}',
      status='${rowData.status}'
      WHERE task_id='${taskId}';`;

      await db.query(queryText, (err, res) => {
        if (!err) {
          return resolve(res);
        }
        return reject(err);
      });
    })
      .then((res) => res)
      .catch((err) => err);
  },
  fetchSingleTask(taskId) {
    return new Promise(async (reject, resolve) => {
      const queryText = `select 
        t.task_id as id,
        t.title as title,
        to_char(t.start_date,'YYYY-MM-DD') as start_date,
        to_char(t.end_date,'YYYY-MM-DD') as end_date,
        DATE_PART('day', "end_date"::timestamp - now()::timestamp) as remaining_days,
        u.username  as assign,
        us.username as supervisor,
        use.username as created_by,
        t.assign as assign_id,
        t.supervisor as supervisor_id,
        t.status as status
        from tasks t 
        join users u
        on u.user_id = t.assign
        join users us
        on us.user_id=t.supervisor
        join users use
        on use.user_id=t.creator
        where task_id=$1;`;

      await db.query(queryText, [taskId], (err, res) => {
        if (!err) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    })
      .then((res) => res)
      .catch((err) => err);
  },

  updateTaskzStatus(status, taskId) {
    return new Promise(async (reject, resolve) => {
      const queryText = `UPDATE tasks set status='${status}' where task_id=$1;`;
      await db.query(queryText, [taskId], (err, res) => {
        if (!err) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    })
      .then((res) => res)
      .catch((err) => err);
  },
};

export default TasksModel;
