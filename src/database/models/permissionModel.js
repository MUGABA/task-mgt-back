import db from "../connections/connection";

const PermissionModal = {
  getAllPermissions() {
    return new Promise(async (reject, resolve) => {
      const textQuery = `
      select p.permision_id as id,
      p.permission_name as permission
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

  getAllPermissionsOnASingleRole(roleId) {
    return new Promise(async (reject, resolve) => {
      const queryText = `
      select 
      p.permision_id as id,
      p.permission_name as permission
      from role_permissions r
      join permissions p
      on p.permision_id = r.permission
      where r.role = $1 and r.status='active';
      `;
      await db.query(queryText, [roleId], (err, res) => {
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
  getAllPermissionsOnASingleRoleName(roleId) {
    return new Promise(async (reject, resolve) => {
      const queryText = `
      select 
      p.permission_name as permission
      from role_permissions r
      join permissions p
      on p.permision_id = r.permission
      where r.role = $1;
      `;
      await db.query(queryText, [roleId], (err, res) => {
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

  revokePermission(roleId, permissionId) {
    return new Promise(async (reject, resolve) => {
      const queryText = `UPDATE role_permissions 
      SET status='deactive'
      where role=$1 and permission=$2;`;

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

  reActivatePermissionOnARole(roleId, permissionId) {
    return new Promise(async (reject, resolve) => {
      const queryText = `UPDATE role_permissions SET status='active' where role=$1 and permission=$2;`;

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

  getPermissionNotForRole(roleId) {
    return new Promise(async (reject, resolve) => {
      const queryText = `select 
      permision_id as id, 
      permission_name as permission
      from permissions
      where permision_id not in
      (select permission from role_permissions where role='${roleId}' and status='active');`;

      await db.query(queryText, (err, res) => {
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
