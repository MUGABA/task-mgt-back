import db from "../connections/connection";

const CommentModel = {
  writeAComment(rowData) {
    return new Promise(async (reject, resolve) => {
      const queryText = `INSERT INTO comments (task,commenter,comment)
            values(
                '${rowData.task}',
                '${rowData.commenter}',
                '${rowData.comment}'
            ) RETURNING *;`;

      await db.query(queryText, (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows[0]);
        }
        return reject(err);
      });
    })
      .then((res) => res)
      .catch((e) => e);
  },

  getAllCommentsOnTask(taskId) {
    return new Promise(async (reject, resolve) => {
      const queryText = `
        select 
        comment_id as id,
        commenter as commenter_id,
        u.username as commenter,
        c.comment as comment
        from comments c
        join users u
        on c.commenter = u.user_id
        where c.task = $1
        order by create_on desc;
        `;

      await db.query(queryText, [taskId], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    })
      .then((res) => res)
      .catch((err) => err);
  },

  deleteComment(commentid) {
    return new Promise(async (reject, resolve) => {
      const queryText = "DELETE FROM comments WHERE comment_id = $1;";
      await db.query(queryText, [commentid], (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    })
      .then((res) => res)
      .catch((err) => err);
  },

  getCommentById(commentId) {
    return new Promise(async (reject, resolve) => {
      const queryText = "SELECT * FROM comments WHERE comment_id = $1;";

      await db.query(queryText, [commentId], (err, res) => {
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

export default CommentModel;
