class Repository {
    constructor(id,iduser,projectname,creationdate,description,condition){ //
        this.id = id ? id : 'DEFAULT',
        this.iduser = iduser,
        this.projectname = projectname,
        this.creationdate = creationdate,
        this.description = description,
        this.condition = condition || 'DEFAULT'
    }  
}
module.exports = { Repository }