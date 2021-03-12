import db from ".././connections/connection";

const RolesModel = {
  async createRole(rowData) {
    return new Promise((reject, resolve) => {
      const queryText = `INSERT INTO roles (role) VALUES('${rowData.role}') RETURNING *;`;
      db.query(queryText, (err, res) => {
        if (res) {
          const { rows } = res;
          console.log(rows);
          return resolve(rows[0]);
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

  async checkRole(roleId) {
    return new Promise(async (reject, resolve) => {
      const queryText = "SELECT role FROM roles WHERE role_id = $1;";

      await db.query(queryText, [roleId], (err, res) => {
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
      .catch((e) => {
        return e;
      });
  },

  async checkRoleName(role) {
    return new Promise(async (reject, resolve) => {
      const queryText = "SELECT role FROM roles WHERE role = $1;";

      await db.query(queryText, [role], (err, res) => {
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
      .catch((e) => {
        return e;
      });
  },

  fetchAll() {
    return new Promise(async (reject, resolve) => {
      const queryText = "SELECT * FROM roles;";

      await db.query(queryText, (err, res) => {
        if (res) {
          const { rows } = res;
          console.log(rows);
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
};

export default RolesModel;
