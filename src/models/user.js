class User {
    constructor(id,fullname,birthdate,email,password,condition){ //
        this.id = id ? id : 'DEFAULT',
        this.fullname = fullname,
        this.birthdate = birthdate,
        this.email = email,
        this.password = password,
        this.condition = condition || 'DEFAULT'
    }  
}
module.exports = { User }