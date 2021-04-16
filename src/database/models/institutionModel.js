import db from "../connections/connection";

const InstitutionModal = {
  registerInstitution(rowData) {
    return new Promise(async (reject, resolve) => {
      const queryText = `INSERT INTO vantage_institutions (institution_name, creator)
                        values(
                            '${rowData.institution_name}',
                            '${rowData.creator}'
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
};

export default InstitutionModal;
