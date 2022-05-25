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
 * @swagger
 * definitions:
 *  User:
 *   type: object
 *   properties:
 *    fullname:
 *     type: string
 *     description: fullname of the user
 *     example: 'Julio Toloza'
 *    birthdate:
 *     type: date
 *     description: the user birthdate
 *     example: '1991-05-10'
 *    email:
 *     type: string
 *     description: the user email
 *     example: 'jtoloza55@gmail.com'
 *    password:
 *     type: string
 *     description: the user password
 *     example: 'tigre2023'
 *  UserLogin:
 *   type: object
 *   properties:
 *    user:
 *     type: string
 *     description: email of the user
 *     example: 'ericsterli@gmail.com'
 *    password:
 *     type: string
 *     description: the user password
 *     example: 'Tigre2023'
 *  Repository:
 *   type: object
 *   properties:
 *    iduser:
 *     type: integer
 *     description: id of the user
 *     example: 1
 *    projectname:
 *     type: string
 *     description: the name project
 *     example: 'nodo_api_rest'  
 *    creationdate:
 *     type: string
 *     description: creationdate project
 *     example: 'nodo_api_rest'
 *    description:
 *     type: string
 *     description: the description project
 *     example: 'nodo_api_rest'      
 */
/**
  * @swagger
  * /signUp:
  *  post:
  *   summary: Create user
  *   description: create user for the organization
  *   requestBody:
  *    content:
  *     application/json:
  *      schema:
  *       $ref: '#/definitions/User'
  *   responses:
  *    201:
  *     description: user created succesfully
  *    400:
  *     description: The user cannot be created due to lack of data
  *    409:
  *     description: User already exists
  */
router.post('/signUp',userControllers.addUser);
/**
  * @swagger
  * /login:
  *  post:
  *   summary: Login user
  *   description: Login user
  *   requestBody:
  *    content:
  *     application/json:
  *      schema:
  *       $ref: '#/definitions/UserLogin'
  *   responses:
  *    200:
  *     description: auth true,token:token
  *    400:
  *     description: The user cannot be log due to lack of data
  *    401:
  *     description: auth false,message:'User or password doesnt exist / or is incorrect'
  */
router.post('/login',loginControllers.Login);
/**
 * @swagger
 * /users:
 *  get:
 *   security:
 *    - bearerAuth: []
 *   summary: get all users
 *   description: get all users
 *   responses:
 *    200:
 *     description: success
 *    204:
 *     description: No content
 *    401:
 *     description: Unauthorized token
  */
router.get('/users',veriyToken,userControllers.getUsers);
/**
  * @swagger
  * /user/{id}:
 *  get:
 *   security:
 *    - bearerAuth: []
 *   summary: get user for id
 *   description: get user for id
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of the user
 *      example: 1
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: 'The searched user is not loaded in the database'
 *    401:
 *     description: Unauthorized token
  */
router.get('/user/:id',veriyToken,userControllers.getUserById);
/**
 * User add
 * @param {user}  Repository object json
 * @returns {JSON} response HTTP 
*/
router.post('/addUser',userControllers.addUser);
/**
  * @swagger
  * /updateUser/{id}:
  *  put:
  *   security:
  *    - bearerAuth: []
  *   summary: update user
  *   description: User update
  *   requestBody:
  *    content:
  *     application/json:
  *      schema:
  *       $ref: '#/definitions/User'
  *   responses:
  *    200:
  *     description: 'User updated successfully'
  *    404:
  *     description: 'The searched user is not loaded in the database'
  *    401:
  *     description: Unauthorized token
  */
router.put('/updateUser/:id',veriyToken,userControllers.updateUser);
/**
  * @swagger
  * /deleteUser/{id}:
 *  delete:
 *   security:
 *     - bearerAuth: []
 *   summary: delete user for id
 *   description: delete user for id
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of the user
 *      example: 1
 *   responses:
 *    200:
 *     description: 'User delete successfully'
 *    404:
 *     description: 'User does not exist in the database'
 *    401:
 *     description: Unauthorized token
  */
router.delete('/deleteUser/:id',veriyToken,userControllers.deactivateUser);
/**
  * @swagger
  * /addrepo:
  *  post:
  *   security:
  *    - bearerAuth: []
  *   summary: Create repository
  *   description: create repository for the organization
  *   requestBody:
  *    content:
  *     application/json:
  *      schema:
  *       $ref: '#/definitions/Repository'
  *   responses:
  *    201:
  *     description: Repository created successfully
  *    409:
  *     description: 'Repository already exists'
  *    401:
  *     description: Unauthorized token
  */
router.post('/addrepo',veriyToken,repoControllers.addRepo);
/**
  * @swagger
  * /getRepos:
 *  get:
 *   security:
 *    - bearerAuth: []
 *   summary: get all repositories
 *   description: get all repositories
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: 'The searched user is not loaded in the database'
 *    401:
 *     description: Unauthorized token
  */
router.get('/getRepos',veriyToken,repoControllers.getRepos);
/**
  * @swagger
  * /getRepoById/{id}:
  *  post:
  *   security:
  *    - bearerAuth: []
  *   summary: get repository for id
  *   description: get repository for id
  *   requestBody:
  *    content:
  *     application/json:
  *      schema:
  *       $ref: '#/definitions/Repository'
  *   responses:
  *    200:
  *     description: Suscces
  *    404:
  *     description: 'The searched repository is not loaded in the database'
  *    401:
  *     description: Unauthorized token
  */
router.post('/getRepoById/:id',veriyToken,repoControllers.getRepoById);
/**
  * @swagger
  * /updateRepo/{id}:
  *  put:
  *   security:
  *    - bearerAuth: []
  *   summary: update repository
  *   description: repository update
  *   requestBody:
  *    content:
  *     application/json:
  *      schema:
  *       $ref: '#/definitions/Repository'
  *   responses:
  *    200:
  *     description: 'Repository updated successfully'
  *    404:
  *     description: 'The searched Repository is not loaded in the database'
  *    401:
  *     description: Unauthorized token
  */
router.put('/updateRepo/:id',veriyToken,repoControllers.updateRepo);
/**
  * @swagger
  * /deleteRepo/{id}:
 *  delete:
 *   security:
 *    - bearerAuth: []
 *   summary: delete repository for id
 *   description: delete repository for id
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of the repository
 *      example: 1
 *   responses:
 *    200:
 *     description: 'repository delete successfully'
 *    404:
 *     description: 'repository does not exist in the database'
 *    401:
 *     description: Unauthorized token
  */
router.delete('/deleteRepo/:id',veriyToken,repoControllers.deleteRepo);


module.exports = router;