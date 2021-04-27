import db from "../connections/connection";

const PermissionModal = {
  getAllPermissions() {
    return new Promise(async (reject, resolve) => {
      const textQuery = `
      select p.permision_id as id,
      p.permission_name as name
      from permissions p;`;
      await db.query(textQuery, (err, res) => {
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
  givePermission(roleId, permissionId) {
    return new Promise(async (reject, resolve) => {
      const queryText = `INSERT INTO role_permissions (role,permission) 
          values (
              '${roleId}',
              '${permissionId}'
          ) RETURNING *;`;

      await db.query(queryText, (res, err) => {
        if (err) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    })
      .then((res) => res)
      .catch((err) => err);
  },
  checkPermissionForRole(roleId, permissionId) {
    return new Promise(async (reject, resolve) => {
      const queryText = `select * from  role_permissions where role=$1 and permission=$2;`;

      await db.query(queryText, [roleId, permissionId], (err, res) => {
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

export default PermissionModal;
