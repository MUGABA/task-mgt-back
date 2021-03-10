import db from '../connections/connection'
const AuthModel = {
    registerUser(rowData) {
        return new Promise(async(reject, resolve) => {
                const queryText = `INSERT INTO users (email,username,password, contact,position,role, level)
            values(
                '${rowData.email}',
                '${rowData.username}',
                '${rowData.password}',
                '${rowData.contact}',
                '${rowData.position}',
                '${rowData.role}',
                '${rowData.level}'
            )
            RETURNING *;`;

                await db.query(queryText, (err, res) => {
                    if (!err) {
                        const { rows } = res
                        console.log(rows)
                        return resolve(rows)
                    }
                    return reject(err)
                })
            }).then(result => {
                return result
            })
            .catch(e => {

            })



    },
    async checkUser(email) {
        const textQuery = `select
        user_id,
        email,
        username,
        password,
        contact,
        level,
        r.rank as rank,
        ro.role as role
        from users u
        join ranks r
        on u.position = r.rank_id
        join roles ro
        on u.role = role
        "role"
        where u.email = $1;
        `
        await db.query(textQuery, [email], (err, res) => {
            if (res) {
                const { rows } = res
                console.log(rows)
                return rows;
            }
            return err
        })
    }
}


export default AuthModel;