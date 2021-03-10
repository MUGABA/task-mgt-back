import db from '../connections/connection'
const AuthModel = {
    async registerUser(rowData) {
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
                return rows
            }
        })
    }
}


export default AuthModel;