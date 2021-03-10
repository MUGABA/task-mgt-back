const AuthModel = {
    registerUser(rowData) {
        const queryText = `INSERT INTO farmers (email,username,password, contact,position,role, level)
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
    }
}