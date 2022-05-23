const addRepoQrs = 'INSERT INTO repository( iduser,projectname, creationdate, description)VALUES ($1,$2,$3,$4)'
const getRepoQrs = 'SELECT * FROM repository where condition = true'
const getRepoByIdQrs = 'SELECT * FROM repository where iduser = $1'
const updateRepoQrs = 'UPDATE repository SET projectname=$1, description=$2  WHERE id = $3'
const deleteRepoQrs = 'UPDATE repository SET condition=$1 WHERE id = $2'
const checkprojectExists ='SELECT * FROM repository where projectname = $1'

module.exports = {
    addRepoQrs,
    getRepoQrs,
    getRepoByIdQrs,
    updateRepoQrs,
    deleteRepoQrs,
    checkprojectExists
}