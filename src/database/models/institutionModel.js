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

  registerInstitutionLeaders(rowData) {
    return new Promise(async (reject, resolve) => {
      const queryText = `INSERT INTO institution_leaders (
      institution,
      first_name,
      last_name,
      email,
      leader_contact,
      leader_location
      )
      values(
          '${rowData.institution}',
          '${rowData.first_name}',
          '${rowData.last_name}',
          '${rowData.email}',
          '${rowData.leader_contact}',
          '${rowData.leader_location}'
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

  async updateLeader(rowData, leaderId) {
    return new Promise(async (reject, resolve) => {
      const queryText = `UPDATE institution_leaders 
        SET 
        first_name = '${rowData.first_name}' 
        last_name = '${rowData.last_name}' 
        email = '${rowData.email}' 
        leader_contact= '${rowData.leader_contact}' 
        leader_location= '${rowData.leader_location}' 
        WHERE leader_id = $1;`;

      await db.query(queryText, [leaderId], (err, res) => {
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

  checkLeader(leaderId) {
    return new Promise(async (reject, resolve) => {
      const queryText = `SELECT * FROM institution_leaders where leader_id = $1`;

      await db.query(queryText, [leaderId], (err, res) => {
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

  fetchAllLeadersOfAnInstitution(institutionId) {
    return new Promise(async (reject, resolve) => {
      const queryText = `SELECT 
       leader_id as id ,
       first_name as FirstName,
       last_name as LastName,
       email,
       leader_contact as contact,
       leader_location as location
       FROM institution_leaders
       where institution = $1;`;

      await db.query(queryText, [institutionId], (err, res) => {
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

  getAllInstitutions() {
    return new Promise(async (reject, resolve) => {
      const queryText = `
        SELECT institution_id as id,
        i.institution_name as name,
        i.inst_district as district,
        i.inst_region as region,
        i.inst_account as inst_account,
        t.type_name as type,
        i.inst_gender as gender,
        CASE 
          WHEN i.use_sasula = true then 'Yes'
        else 'No'
        end as use_sasula,
        i.sasula_code as sasula_code,
        to_char(i.created_on,'YYYY-MM-DD') as created_on,
        u.username as username
        from vantage_institutions i
        join institution_type t
        on t.type_id = i.inst_type
        join users u 
        on u.user_id = i.created_by
        order by created_on desc;
      `;
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
