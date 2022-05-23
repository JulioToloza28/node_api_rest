const { pool } = require ('./db')
const { Repository } = require ('../models/repository')
const repositoryQuery = require('../requests/repositoryQuery')

const addRepo  = async (request,response)=> {
     let repository = new Repository(null,request.body.iduser,request.body.projectname,request.body.creationdate,request.body.description,null)
     pool.query(repositoryQuery.checkprojectExists,[repository.projectname],async(error,result) =>{
        if(error)throw error;
        if(result.rows.length){
                 response.status(409).send(`Repository already exists`);
        }else{
            let values = [repository.iduser,repository.projectname,repository.creationdate,repository.description]
            pool.query(repositoryQuery.addRepoQrs,values,(error,result)=>{
                if(error)throw error;
                response.status(201).send(`Repository created successfully!`);
            })
            
        }
     })
}
const updateRepo = (req,res)=>{
    const id = parseInt(req.params.id);
    pool.query(repositoryQuery.getRepoByIdQrs,[id],(error,result)=>{
        const noUserFount = !result.rows.length;
        if(noUserFount){
            res.send('Repository does not exist in the database')
        }else{
            const values = [req.body.projectname,req.body.description,id]
            pool.query(repositoryQuery.updateRepoQrs,values,(error,result)=>{
                if(error)throw error;
                if(result){
                    res.status(200).send('Repository updated successfully')
                }
            })
        }
        
    })
}
const deleteRepo = (req,res) => {
    const id = parseInt(req.params.id);
    pool.query(repositoryQuery.deleteRepoQrs,[false,id],(error,result)=>{
      if(error){
        throw error;
      }
      if(result.rows.length){
        res.status(409).send(`Repository does not exist`);
    }else{
        res.status(200).send('Repository delete successfully')
    }
      
    })
} 
const getRepos =  (request,response) => {
    pool.query(repositoryQuery.getRepoQrs,(error,result) =>{
      if(error)throw error;
      if(result.rows.length==0){
        response.status(204).send({message:`Repository does not exist`})
      }else{
        response.status(200).json(result.rows);
      }
      
    })
}
const getRepoById = (request,response)=> {
    const id = parseInt(request.params.id);
    pool.query(repositoryQuery.getRepoByIdQrs,[id],(error,result) =>{
      if(error)throw error;
      let data = result.rows
      //console.log({data})
      if(data == undefined){
        response.status(404).json({message:'The searched repository is not loaded in the database '});
      }else{
        response.status(200).json(data);
      }
      
    })
}

module.exports = {
    addRepo,
    getRepos,
    getRepoById,
    updateRepo,
    deleteRepo
}