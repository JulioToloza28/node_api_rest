const getUsersQry = `SELECT * FROM  clientuser where email = $1`;


module.exports = {
    getUsersQry
}