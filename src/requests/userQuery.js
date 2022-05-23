const getUsersQry = `SELECT * FROM  clientuser where condition = true`;
const getUserByIdQry = `SELECT * FROM  clientuser where id = $1`;
const checkEmailExists = `SELECT * FROM  clientuser where email = $1`;
const addUserQry = `INSERT INTO clientuser (name, birthdate, email, password) VALUES ($1,$2,$3,$4)`
const updateUserQry = `UPDATE clientuser SET name = $1, birthdate = $2, email =$3, password = $4 where id = $5`;
const deactivateUserQry = `UPDATE clientuser SET condition = false where id = $1`;


module.exports = {
    getUsersQry,
    getUserByIdQry,
    checkEmailExists,
    addUserQry,
    updateUserQry,
    deactivateUserQry
}