const { pool } = require ('./db')
const { User } = require ('../models/user')
const userQuery = require('../requests/userQuery')
const bcrypt = require('bcrypt');

const getUsers =  (request,response) => {
  //TODO: VALIDACIONES (TOKEN, REDIS, TRY)
  pool.query(userQuery.getUsersQry,(error,result) =>{
    if(error)throw error;
    response.status(200).json(result.rows);
  })
}
const getUserById = (request,response)=> {
  //TODO: VALIDACIONES (TOKEN, REDIS, TRY)
  const id = parseInt(request.params.id);
  pool.query(userQuery.getUserByIdQry,[id],(error,result) =>{
    if(error)throw error;
    let data = result.rows[0]
    //console.log({data})
    if(data == undefined){
      response.status(404).json({message:'The searched user is not loaded in the database '});
    }else{
      if(!data.condition){response.status(401).json();}
      let user = new User(data.id,data.name,data.birthdate,data.email,data.password,data.condition)
      //console.log({user})
      response.status(200).json(user);
    }
    
  })
}
const addUser  = async (request,response)=> {
  let user = new User(null,request.body.fullname,request.body.birthdate,request.body.email,request.body.password,null)
  // check if email exists
  pool.query(userQuery.checkEmailExists,[user.email],async(error,result) =>{
    if(result.rows.length){
      response.status(409).send(`User already exists`);
    }else{
      //add user to db
      let pass = bcrypt.hashSync(user.password,10);
      let values = [user.fullname,user.birthdate,user.email,pass]
      pool.query(userQuery.addUserQry,values,(error,result)=>{
        if(error)throw error;
        //crear token 
        response.status(201).send(`User created successfully!`);
      })
    }
  })
}
const updateUser = (req,res)=>{
  const id = parseInt(req.params.id);
  pool.query(userQuery.getUserByIdQry,[id],(error,result)=>{
    const noUserFount = !result.rows.length;
    if(noUserFount){
      res.send('User does not exist in the database')
    }else{
      console.log(req.body)
      const values = [req.body.fullname,req.body.birthdate,req.body.email,req.body.password,id]
      console.log(values)
      pool.query(userQuery.updateUserQry,values,(error,result)=>{
        if(error){
          console.log(error)
          throw error;
        } 
        res.status(200).send('User updated successfully')

      })
    }
  })
} 
const deactivateUser = (req,res) => {
  //TODO: VALIDACIONES (TOKEN, REDIS, TRY)
  const id = parseInt(req.params.id);
  pool.query(userQuery.deactivateUserQry,[id],(error,result)=>{
    if(error){
      console.log(error)
      throw error;
    } 
    res.status(200).send('User deactivate successfully')

  })
} 

module.exports = {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deactivateUser
}