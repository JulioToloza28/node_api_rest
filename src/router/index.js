//import { MainLayout } from '../../components/layouts/MainLayout'
const { Router } = require('express');
const router = Router();  
const userControllers = require ('../controllers/user')
const loginControllers = require ('../controllers/login')
const repoControllers = require ('../controllers/repository')  
const {veriyToken} = require ('../helpers/tokenGenerator')

router.get('/',(req,res)=> {
    res.send('Start of the challenge')
});

/**
 * SingUp
 * @param {LoginUser} LoginUser object json
 * @returns {JSON} response HTTP 
*/
router.post('/singUp',userControllers.addUser);
/**
 * Login
 * @param {LoginUser} LoginUser object json
 * @returns {JSON} response HTTP 
*/
router.post('/login',loginControllers.Login);
/**
 * Users
 * @returns {JSON} response HTTP 
*/
router.get('/users',veriyToken,userControllers.getUsers);
/**
 * User for id
 * @param {id} id number
 * @returns {JSON} response HTTP 
*/
router.get('/user/:id',veriyToken,userControllers.getUserById);
/**
 * User add
 * @param {user}  Repository object json
 * @returns {JSON} response HTTP 
*/
router.post('/addUser',userControllers.addUser);
/**
 * User update
 * @param {id}  int 
 * @returns {JSON} response HTTP 
*/
router.put('/updateUser/:id',veriyToken,userControllers.updateUser);

/**
 * User delete
 * @param {user}  Repository object json
 * @returns {JSON} response HTTP 
*/
router.delete('/deactivateUser/:id',veriyToken,userControllers.deactivateUser);

/**
 * Repository add
 * @param {Repository} Repository object json
 * @returns {JSON} response HTTP 
*/
router.post('/addrepo',veriyToken,repoControllers.addRepo);

/**
 * Repository
 * @param {Repository} Repository object json
 * @returns {JSON} response HTTP 
*/
router.get('/getRepos',veriyToken,repoControllers.getRepos);
/**
 * Repository
 * @param {Repository} Repository object json
 * @returns {JSON} response HTTP 
*/
router.post('/getRepoById/:id',veriyToken,repoControllers.getRepoById);
/**
 * Repository
 * @param {Repository} Repository object json
 * @returns {JSON} response HTTP 
*/
router.put('/updateRepo/:id',veriyToken,repoControllers.updateRepo);
/**
 * Repository
 * @param {Repository} Repository object json
 * @returns {JSON} response HTTP 
*/
router.delete('/deleteRepo/:id',veriyToken,repoControllers.deleteRepo);


module.exports = router;