import db from "../connections/connection";

const ProjectModal = {
  createProject(rowData) {
    return new Promise(async (reject, resolve) => {
      const queryText = `INSERT INTO projects (project_name)
                  values(
                      '${rowData.project_name}'
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

  async checkProject(projectName) {
    return new Promise(async (reject, resolve) => {
      const queryText =
        "SELECT project_name FROM projects WHERE project_name = $1;";

      await db.query(queryText, [projectName], (err, res) => {
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

  async checkProjectWithId(projectId) {
    return new Promise(async (reject, resolve) => {
      const queryText =
        "SELECT project_name FROM projects WHERE project_id = $1;";

      await db.query(queryText, [projectId], (err, res) => {
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

  async updateProject(projectName, projectId) {
    return new Promise(async (reject, resolve) => {
      const queryText =
        "UPDATE projects SET project_name = $1 WHERE project_id = $2;";

      await db.query(queryText, [projectName, projectId], (err, res) => {
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

  async getAllProjects() {
    return new Promise(async (reject, resolve) => {
      const queryText =
        "SELECT project_name as project,project_id as id FROM projects;";

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

export default ProjectModal;
