import db from "../connections/connection";

const ProductModel = {
  createNewProduct(rowData) {
    return new Promise(async (reject, resolve) => {
      const queryText = `INSERT INTO products (name,created_by,manager)
            values(
                '${rowData.name}',
                '${rowData.created_by}',
                '${rowData.manager}'

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

  getAllProducts() {
    return new Promise(async (reject, resolve) => {
      const queryText = `
        select
        p.id as id,
        name as product,
        to_char(p.created_on,'YYYY-MM-DD') as created_on,
        u.username as creator,
        pm.username as pm
        from products p
        join users u
        on p.created_by = u.user_id
        join users pm
        on p.project_manager = pm.user_id
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

  getProductById(productId) {
    return new Promise(async (reject, resolve) => {
      const queryText = "SELECT * FROM products WHERE id = $1;";
      await db.query(queryText, [productId], (err, res) => {
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

  getCommentById(commentId) {
    return new Promise(async (reject, resolve) => {
      const queryText = "SELECT * FROM comments WHERE comment_id = $1;";

      await db.query(queryText, [commentId], (err, res) => {
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

export default ProductModel;
