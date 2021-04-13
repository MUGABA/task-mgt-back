import db from "../connections/connection";

const AuthModel = {
  async fetchAllUsers() {
    return new Promise(async (resolve, reject) => {
      const textQuery = `select
            user_id as id,
            email,
            username,
            contact,
            role as role
            from users u
            join roles ro
            on u.user_role = ro.role_id
        `;
      await db.query(textQuery, (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }

        return reject(err);
      });
    })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  },
  async fetchCurrentUser(userId) {
    return new Promise(async (resolve, reject) => {
      const textQuery = `select
            email,
            username,
            contact,
            ro.role as user_role
            from users u
            join roles ro
            on u.user_role = ro.role_id
            where user_id = $1;
        `;
      await db.query(textQuery, [userId], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  },
  registerUser(rowData) {
    return new Promise(async (reject, resolve) => {
      const queryText = `INSERT INTO users (email,username,user_password, contact,user_role)
            values(
                '${rowData.email}',
                '${rowData.username}',
                '${rowData.user_password}',
                '${rowData.contact}',
                '${rowData.user_role}'
            )
            RETURNING *;`;

      await db.query(queryText, (err, res) => {
        if (!err) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    })
      .then((result) => {
        return result;
      })
      .catch((e) => {
        return e;
      });
  },
  async checkUser(email) {
    return new Promise(async (resolve, reject) => {
      const textQuery = `select
            user_id,
            email,
            username,
            user_password as password,
            contact,
            ro.role as role
            from users u
            join roles ro
            on u.user_role = ro.role_id
            where u.email = $1;
        `;
      await db.query(textQuery, [email], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  },
  async checkUSerName(username) {
    return new Promise(async (resolve, reject) => {
      const textQuery = `select
            user_id,
            username
            from users
            where username = $1;
        `;
      await db.query(textQuery, [username], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  },
  checkUserWithId(id) {
    return new Promise(async (resolve, reject) => {
      const textQuery = "select * from users WHERE user_id = $1;";
      await db.query(textQuery, [id], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  },

  updateUserPassword(password, userId) {
    return new Promise(async (resolve, reject) => {
      const textQuery = `UPDATE users SET user_password='${password}'WHERE user_id='${userId}'`;
      await db.query(textQuery, (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  },

  updateUserDetails(rowData, userId) {
    return new Promise(async (resolve, reject) => {
      const textQuery = `UPDATE users SET
       email='${rowData.email}',
       username='${rowData.username}',
       contact='${rowData.contact}',
       user_role='${rowData.user_role}'
        WHERE user_id='${userId}'`;
      await db.query(textQuery, (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  },
};

export default AuthModel;
