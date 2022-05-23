const { User } = require ('../models/user')
const loginQuery = require('../requests/loginQuery')
const userEvenQuery = require('../requests/userEvent')
const { pool } = require('./db')
const bcrypt = require('bcrypt');
const {generatorToken} = require ('../helpers/tokenGenerator')
const moment = require ('moment');
const redis = require ('../helpers/redis')
require ("dotenv").config();


const Login = (req,res)=> {
    let date = moment().locale('es-ar').format('YYYY-MM-DD HH:mm:ss');
    console.log({date})
    let user = {email:req.body.user,password:req.body.password} 
    pool.query(loginQuery.getUsersQry,[user.email], (error,result) =>{
        if(error){
            console.log('Error:',error)
            throw error
        }; 
            if(result.rows.length!=0){
                const verif = bcrypt.compareSync(user.password,result.rows[0].password)
                if(verif){
                    let token = generatorToken(user)
                    let values = [result.rows[0].id,date,'Login']
                    pool.query(userEvenQuery.addUserEventsQry,values,async (error,result) =>{
                        if(error){
                            console.log('Error:',error)
                            throw error
                        };
                        console.log('Guarda en REDIS?')
                        console.log(await redis.setRedis(user.email,token))
                        res.status(200).json({auth: true,token:token})
                    })
                }else{
                    res.status(401).json({auth: false,message:'User or password doesnt exist / or is incorrect'})
                }
            }else{
                res.status(401).json({auth: false,message:'User or password doesnt exist / or is incorrect'})
            }   
    })
    
}


module.exports = {
    Login
}