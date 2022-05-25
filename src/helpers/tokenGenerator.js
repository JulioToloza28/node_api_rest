'use strict'

const jwt = require('jsonwebtoken');
const moment = require ('moment');
require ("dotenv").config();

function generatorToken(payload){
    const accesToken = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'10m'})
    return accesToken;
}

function veriyToken(req,res,next){
    let bearerHeader = req.headers['authorization'];
    console.log(req.headers)
    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(" ");
        req.token = bearerToken[1]
        next();
    }else{
        res.status(401).send({message:'Unauthorized token'});
    }
}
module.exports = {generatorToken,veriyToken}