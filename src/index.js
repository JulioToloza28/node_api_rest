const express = require('express');
const app = express();
require ("dotenv").config();

const PORT = process.env.PORT || 4000
//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//router
app.use(require('./router/index'));

app.listen( PORT , () =>{
    console.log(`Server on port ${PORT}`)
})
