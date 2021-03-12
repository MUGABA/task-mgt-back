import { reject } from "lodash";
import db from "./connection";

const tasks = {
  create: `CREATE TABLE IF NOT EXISTS tasks (
        task_id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        start_date TIMESTAMP NOT NULL,
        end_date TIMESTAMP NOT NULL,
        deliverables TEXT NOT NULL,
        assign INTEGER,
        supervisor INTEGER,
        complete INTEGER DEFAULT 0;
        CONSTRAINT pk_assign FOREIGN KEY (assign) REFERENCES users(user_id),
        CONSTRAINT pk_supervisor FOREIGN KEY (supervisor) REFERENCES users(user_id)
    );`,
  delete: "DROP TABLE IF EXISTS tasks;",
};

const comments = {
  create: `CREATE TABLE IF NOT EXISTS comments (
        comment_id SERIAL PRIMARY KEY,
        task INTEGER,
        comment TEXT,
        commentor INTEGER
    );`,
  delete: `DROP TABLE IF EXISTS comments;`,
};

const users = {
  create: `CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        email VARCHAR(200) UNIQUE NOT NULL,
        username VARCHAR(50) NOT NULL,
        password TEXT NOT NULL,
        contact VARCHAR(15) NOT NULL,
        position INTEGER,
        role INTEGER,
        level level,
        CONSTRAINT fk_position FOREIGN KEY (position) REFERENCES ranks(rank_id),
        CONSTRAINT fk_role FOREIGN KEY (role) REFERENCES roles(role_id)
    );`,
  delete: "DROP TABLE IF EXISTS users;",
  anenum: `CREATE TYPE level AS ENUM('lead','member');`,
};

// these are roles that can be created....

const roles = {
  create: `CREATE TABLE IF NOT EXISTS roles(
        role_id SERIAL PRIMARY KEY,
        role VARCHAR(50) NOT NULL
    );`,
  delete: "DROP TABLE IS EXISTS roles;",
};

// Ranks... These define category where an individual falls, it could be a dev, a marketier, an admin,
const ranks = {
  create: `CREATE TABLE IF NOT EXISTS ranks (
        rank_id SERIAL PRIMARY KEY,
        rank VARCHAR(50) NOT NULL
    );`,
  delete: "DROP TABLE IF EXISTS ranks;",
};

const projects = {
  create: `CREATE TABLE IF NOT EXISTS projects (
        project_id SERIAL PRIMARY KEY,
        project_name VARCHAR(50) NOT NULL,
        project_lead INTEGER
    );`,
  delete: `DROP TABLE IF EXISTS projects;`,
};

const issue = {
  create: `CREATE TABLE IF NOT EXISTS issues (
        issue_id SERIAL PRIMARY KEY,
        issue_title VARCHAR(200) NOT NULL,
        project_id INTEGER,
        dev_assigned INTEGER,
        creator INTEGER,
        created_on TIMESTAMP DEFAULT NOW();
        status enum,
        status enum
    );`,
  delete: "DROP TABLE IF EXISTS issues;",
};

const createTasksTable = () => {
  return new Promise((reject, resolve) => {
    db.query(tasks.create, (err) => {
      if (!err) {
        return resolve({ message: "tasks tables created successfully" });
      }
      return reject(err);
    });
  });
};

function deleteTasksTable() {
  return new Promise((reject, resolve) => {
    db.query(tasks.delete, (err) => {
      if (!err) return resolve("table deleted");
      return reject(err);
    });
  });
}

const createCommentsTable = () => {
  return new Promise((reject, resolve) => {
    db.query(comments.create, (err) => {
      if (!err) {
        return resolve("created");
      }
      return reject(err);
    });
  });
};

function deleteCommectsTable() {
  return new Promise((reject, resolve) => {
    db.query(comments.delete, (err) => {
      if (!err) return resolve("table deleted");
      return reject(err);
    });
  });
}

const createUsersTable = () => {
  return new Promise((reject, resolve) => {
    db.query(users.create, (err) => {
      if (!err) {
        return resolve("created");
      }
      return reject(err);
    });
  });
};

function deleteUsersTable() {
  return new Promise((reject, resolve) => {
    db.query(users.delete, (err) => {
      if (!err) return resolve("table deleted");
      return reject(err);
    });
  });
}

const createRolesTable = () => {
  return new Promise((reject, resolve) => {
    db.query(roles.create, (err) => {
      if (!err) {
        return resolve("created");
      }
      return reject(err);
    });
  });
};

function deleteRolesTable() {
  return new Promise((reject, resolve) => {
    db.query(roles.delete, (err) => {
      if (!err) return resolve("table deleted");
      return reject(err);
    });
  });
}

const createProjectsTable = () => {
  return new Promise((reject, resolve) => {
    db.query(projects.create, (err) => {
      if (!err) {
        return resolve("created");
      }
      return reject(err);
    });
  });
};

function deleteProjectsTable() {
  return new Promise((reject, resolve) => {
    db.query(projects.delete, (err) => {
      if (!err) return resolve("table deleted");
      return reject(err);
    });
  });
}

const createIssuesTable = () => {
  return new Promise((reject, resolve) => {
    db.query(issue.create, (err) => {
      if (!err) {
        return resolve("created");
      }
      return reject(err);
    });
  });
};

function deleteIssuesTable() {
  return new Promise((reject, resolve) => {
    db.query(issue.delete, (err) => {
      if (!err) return resolve("table deleted");
      return reject(err);
    });
  });
}

const createRanksTable = () => {
  return new Promise((reject, resolve) => {
    db.query(ranks.create, (err) => {
      if (!err) {
        return resolve("created");
      }
      return reject(err);
    });
  });
};

function deleteRanksTable() {
  return new Promise((reject, resolve) => {
    db.query(ranks.delete, (err) => {
      if (!err) return resolve("table deleted");
      return reject(err);
    });
  });
}

function createEnum() {
  return new Promise((reject, resolve) => {
    db.query(users.anenum, (err) => {
      if (!err) return resolve("enum created");
      return reject(err);
    });
  });
}

export default {
  createTasksTable,
  deleteTasksTable,
  createCommentsTable,
  deleteCommectsTable,
  createUsersTable,
  deleteUsersTable,
  createRolesTable,
  deleteRolesTable,
  createProjectsTable,
  deleteProjectsTable,
  createIssuesTable,
  deleteIssuesTable,
  createRanksTable,
  deleteRanksTable,
  createEnum,
};
