import db from "../connections/connection";

const IssuesModel = {
  createNewProductIssue(rowData) {
    return new Promise(async (reject, resolve) => {
      const queryText = `INSERT INTO issues (title,description,product_id,created_by,assigned_user,rating)
            values(
                '${rowData.title}',
                '${rowData.description}',
                '${rowData.product_id}',
                '${rowData.created_by}',
                '${rowData.assigned_user}',
                '${rowData.rating}'
            ) RETURNING *;`;

      await db.query(queryText, (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows[0]);
        }
        return reject(err);
      });
    })
      .then((res) => res)
      .catch((e) => e);
  },

  getAllIssues() {
    return new Promise(async (reject, resolve) => {
      const queryText = `
        select
        i.id as id,
        i.title as title,
        i.description as description,
        us.username as assignee,
        to_char(i.created_on,'YYYY-MM-DD') as created_on,
        u.username as created_by,
        p.product_name as product
        i.rating as rating
        from issues i
        join users u
        on i.created_by = u.user_id
        join users us
        on i.assigned_user = us.user_id
        join products p
        on i.product_id = p.id
        order by created_on
        ;`;

      await db.query(queryText, (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    })
      .then((res) => res)
      .catch((err) => err);
  },

  getIssueById(issueId) {
    return new Promise(async (reject, resolve) => {
      const queryText = `
        select
        i.id as id,
        i.title as title,
        i.description as description,
        i.assigned_user as Assign_id,
        i.product_id as product_id,
        us.username as assignee,
        to_char(i.created_on,'YYYY-MM-DD') as created_on,
        u.username as created_by,
        p.product_name as product,
        i.rating as rating
        from issues i
        join users u
        on i.created_by = u.user_id
        join users us
        on i.assigned_user = us.user_id
        join products p
        on i.product_id = p.id
        where i.id = $1
        order by created_on
        ;`;

      await db.query(queryText, [issueId], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    })
      .then((res) => res)
      .catch((err) => err);
  },

  getAllIssuesOnProduct(productId) {
    return new Promise(async (reject, resolve) => {
      const queryText = `
        select
        i.id as id,
        i.title as title,
        i.description as description,
        us.username as assignee,
        p.product_name as product,
        to_char(i.created_on,'YYYY-MM-DD') as created_on,
        u.username as created_by,
        i.rating as rating
        from issues i
        join users u
        on i.created_by = u.user_id
        join users us
        on i.assigned_user = us.user_id
        join products p
        on i.product_id = p.id
        where i.product_id = $1
        order by created_on
        ;`;

      await db.query(queryText, [productId], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    })
      .then((res) => res)
      .catch((err) => err);
  },

  getAllIssuesInNewState() {
    return new Promise(async (reject, resolve) => {
      const queryText = `
        select
        i.id as id,
        i.title as title,
        i.description as description,
        us.username as assignee,
        p.product_name as product,
        to_char(i.created_on,'YYYY-MM-DD') as created_on,
        u.username as created_by,
        i.rating as rating
        from issues i
        join users u
        on i.created_by = u.user_id
        join users us
        on i.assigned_user = us.user_id
        join products p
        on i.product_id = p.id
        where i.status = 'new'
        order by created_on
        ;`;

      await db.query(queryText, (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    })
      .then((res) => res)
      .catch((err) => err);
  },

  getAllIssuesInProgressState() {
    return new Promise(async (reject, resolve) => {
      const queryText = `
        select
        i.id as id,
        i.title as title,
        i.description as description,
        us.username as assignee,
        p.product_name as product,
        to_char(i.created_on,'YYYY-MM-DD') as created_on,
        u.username as created_by,
        i.rating as rating
        from issues i
        join users u
        on i.created_by = u.user_id
        join users us
        on i.assigned_user = us.user_id
        join products p
        on i.product_id = p.id
        where i.status = 'progress'
        order by created_on
        ;`;

      await db.query(queryText, (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    })
      .then((res) => res)
      .catch((err) => err);
  },

  getAllIssuesInCompleteState() {
    return new Promise(async (reject, resolve) => {
      const queryText = `
        select
        i.id as id,
        i.title as title,
        i.description as description,
        us.username as assignee,
        p.product_name as product,
        to_char(i.created_on,'YYYY-MM-DD') as created_on,
        u.username as created_by,
        i.rating as rating
        from issues i
        join users u
        on i.created_by = u.user_id
        join users us
        on i.assigned_user = us.user_id
        join products p
        on i.product_id = p.id
        where i.status = 'complete'
        order by created_on
        ;`;

      await db.query(queryText, (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    })
      .then((res) => res)
      .catch((err) => err);
  },

  updateIssue(rowData, issueId) {
    return new Promise(async (reject, resolve) => {
      const queryText = `UPDATE issues SET 
      title='${rowData.title}',
      description='${rowData.description}',
      product_id='${rowData.product_id}',
      assigned_user='${rowData.assigned_user}',
      rating='${rowData.rating}'
      WHERE id=$1;`;

      await db.query(queryText, [issueId], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    })
      .then((res) => res)
      .catch((e) => e);
  },

  updateIssueStatus(rowData) {
    return new Promise(async (reject, resolve) => {
      const queryText = `UPDATE issues SET 
      status='${rowData.status}'
      WHERE id='${rowData.id}'`;

      await db.query(queryText, (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    })
      .then((res) => res)
      .catch((e) => e);
  },
};

export default IssuesModel;
