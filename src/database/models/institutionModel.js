import db from "../connections/connection";

const InstitutionModal = {
  registerInstitution(rowData) {
    return new Promise(async (reject, resolve) => {
      const queryText = `INSERT INTO vantage_institutions (
      institution_name,
      inst_district,
      inst_region,
      inst_account,
      inst_type,
      inst_gender,
      use_sasula,
      sasula_code,
      created_by,
      sasula_letter,
      leader_document
      )
      values(
          '${rowData.institution_name}',
          '${rowData.inst_district}',
          '${rowData.inst_region}',
          '${rowData.inst_account}',
          '${rowData.inst_type}',
          '${rowData.inst_gender}',
          '${rowData.use_sasula}',
          '${rowData.sasula_code}',
          '${rowData.created_by}',
          '${rowData.sasula_letter}',
          '${rowData.leader_document}'
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

  registerInstitutionType(rowData) {
    return new Promise(async (reject, resolve) => {
      const queryText = `INSERT INTO institution_type (type_name)
                        values(
                            '${rowData.type_name}'
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

  checkInstitution(name) {
    return new Promise(async (reject, resolve) => {
      const queryText = `SELECT 
      institution_id as id ,
       institution_name as institution 
       FROM vantage_institutions 
       WHERE institution_name = $1;`;

      await db.query(queryText, [name], (err, res) => {
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
  checkInstitutionType(name) {
    return new Promise(async (reject, resolve) => {
      const queryText = `SELECT 
      type_id as id ,
       type_name as name
       FROM institution_type 
       WHERE type_name = $1;`;

      await db.query(queryText, [name], (err, res) => {
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

  fetchAllInstitutionType() {
    return new Promise(async (reject, resolve) => {
      const queryText = `SELECT 
      type_id as id ,
       type_name as name
       FROM institution_type;`;

      await db.query(queryText, (err, res) => {
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
};

export default InstitutionModal;
