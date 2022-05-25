const express = require('express');
const app = express();
require ("dotenv").config();
const path = require ('path')
//swagger
const swaggerUI = require ('swagger-ui-express');
const swaggerJsDoc = require ('swagger-jsdoc');
process.env.URL_HOST = "http://localhost:3000"

const swaggerSpec = {
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Node_Api_Rest",
            version:"1.0.0",
            description:'C-Tech´s Challenge Nodejs Developer',
            contact:{
                name:'Julio Toloza',
                email:'jtoloza55@gmail.com'
            }
        },
        components: {
            securitySchemes: {
              bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
              }
            }
          },
        servers:[{
            url: process.env.URL_HOST
        }]
    },
    apis: [`${__dirname}/router/index.js`]
}
const swaggerDocs = swaggerJsDoc(swaggerSpec);

const PORT = process.env.PORT || 4000
//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));

//router
app.use(require('./router/index'));

app.listen( PORT , () =>{
    console.log(`Server on port ${PORT}`)
})
