import db from ".././connections/connection";

const RolesModel = {
  createRole(rowData) {
    return new Promise((reject, resolve) => {
      const queryText = `INSERT INTO roles (role) VALUES('${rowData.role}') RETURNING *;`;

      db.query(queryText, (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows[0]);
        }
        return reject(err);
      });
    });
  },

  checkRole(role) {
    return new Promise((reject, resolve) => {
      const queryText = "SELECT role FROM roles WHERE role = $1;";

      db.query(queryText, [role], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    });
  },

  fetchAll() {
    return new Promise((reject, resolve) => {
      const queryText = "SELECT * FROM roles;";

      db.query(queryText, (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    });
  },
};

export default RolesModel;
