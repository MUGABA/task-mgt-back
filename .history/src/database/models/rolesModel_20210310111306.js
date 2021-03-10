import db from ".././connections/connection";

const RolesModel = {
    createRole(rowData) {
        return new Promise((reject, resolve) => {
            const queryText = `INSERT INTO roles (role) VALUES('${rowData.role}') RETURNING *;`;

            db.query(queryText, (err, res) => {
                if (res) {
                    const { rows } = res;
                    console.log(rows);
                    return resolve(rows[0]);
                }
                return reject(err);
            });
        }).catch((e) => {
            // console.error(e);
        });
    },

    checkRole(role) {
        return new Promise((reject, resolve) => {
            const queryText = "SELECT role FROM roles WHERE role = $1;";

            db.query(queryText, [role], (err, res) => {
                if (res) {
                    const { rows } = res;
                    console.log(rows);
                    return resolve(rows);
                }
                return reject(err);
            });
        }).catch((e) => {
            // console.error(e); mouses 
        });
    },

    fetchAll() {
        const queryText = "SELECT * FROM roles;";
        db.query(queryText, (err, res) => {
            if (!err) {
                const { rows } = res
                console.log(rows)
                return rows
            }
        })

        // return new Promise((reject, resolve) => {
        //     const queryText = "SELECT * FROM roles;";

        //     db.query(queryText, (err, res) => {
        //         if (res) {
        //             const { rows } = res;
        //             console.log(rows)
        //             return resolve(rows);
        //         }
        //         return reject(err);
        //     });
        // }).catch(e => {

        // });
    },
};

export default RolesModel;