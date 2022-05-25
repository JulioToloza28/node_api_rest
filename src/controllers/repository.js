const { pool } = require ('./db')
const { Repository } = require ('../models/repository')
const repositoryQuery = require('../requests/repositoryQuery')

const addRepo  = async (request,response)=> {
    try {
      let repository = new Repository(null,request.body.iduser,request.body.projectname,request.body.creationdate,request.body.description,null)
     pool.query(repositoryQuery.checkprojectExists,[repository.projectname],async(error,result) =>{
        if(error)throw error;
        if(result.rows.length){
                 return response.status(409).send(`Repository already exists`);
        }else{
            let values = [repository.iduser,repository.projectname,repository.creationdate,repository.description]
            pool.query(repositoryQuery.addRepoQrs,values,(error,result)=>{
                if(error)throw error;
                return response.status(201).send(`Repository created successfully!`);
            })
            
        }
     })
    }catch(error){
    throw new Error('Error en addRepo '+error);
    }
     
}
const updateRepo = (req,res)=>{
  try {
    const id = parseInt(req.params.id);
    pool.query(repositoryQuery.getRepoByIdQrs,[id],(error,result)=>{
        const noUserFount = !result.rows.length;
        if(noUserFount){
          return res.send('Repository does not exist in the database')
        }else{
            const values = [req.body.projectname,req.body.description,id]
            pool.query(repositoryQuery.updateRepoQrs,values,(error,result)=>{
                if(error)throw error;
                if(result){
                  return res.status(200).send('Repository updated successfully')
                }
            })
        }
        
    })
  } catch (error) {
    throw new Error("Error en updateRepo " + error);
  }  
}
const deleteRepo = (req,res) => {
  try {
    const id = parseInt(req.params.id);
    pool.query(repositoryQuery.deleteRepoQrs,[false,id],(error,result)=>{
      if(error){
        throw error;
      }
      if(result.rowCount == 0){
        return res.status(409).send(`Repository does not exist`);
    }else{
        return res.status(200).send('Repository delete successfully')
    }
      
    })
  } catch (error) {
    throw new Error("Error en deleteRepo " + error);
  }
    
} 
const getRepos =  (request,response) => {
  try {
    pool.query(repositoryQuery.getRepoQrs,(error,result) =>{
      if(error)throw error;
      if(result.rows.length==0){
        return response.status(204).send({message:`Repository does not exist`})
      }else{
        return response.status(200).json(result.rows);
      }
      
    })
    
  } catch (error) {
    throw new Error("Error en getRepos " + error);
  }
   
}
const getRepoById = (request,response)=> {
  try {
    const id = parseInt(request.params.id);
    pool.query(repositoryQuery.getRepoByIdQrs,[id],(error,result) =>{
      if(error)throw error;
      let data = result.rows
      //console.log({data})
      if(data == undefined){
        return response.status(404).json({message:'The searched repository is not loaded in the database '});
      }else{
        return response.status(200).json(data);
      }
      
    })
  } catch (error) {
    throw new Error("Error en getRepoById " + error);
  }
    
}

module.exports = {
    addRepo,
    getRepos,
    getRepoById,
    updateRepo,
    deleteRepo
}