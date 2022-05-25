# node_api_rest

<<<<<<< HEAD
This is a Node.js project  with node_api_rest.

Getting Started
First, run the development server:

npm run dev
# or
npm start
Open http://localhost:3000 with your browser to see the welcome to the challenge.

You can start by accessing the path http://localhost:3000/api-docs. The documentation will be in that address.

Made with swagger, it will make it easier for you to carry out the tests.

When uploading it to heroku, the following changes are made:
- Uncomment //ssl:{rejectUnauthorized: false} in scr/controllers/db
- Comment process.env.URL_HOST = "http://localhost:3000" which is in /index.js
=======
Primero, levantar el entorno:
npm run dev
o
npm start
Abrir http://localhost:3000 en su navegador para ver el resultado.

##Creacion de usuario
Utilizando una plataforma de peticiones HTTP (Postman), apuntando a http://localhost:3000/singUp, ingresando los siguientes parametros 
Body:
{
    "fullname": "Eric Sterli",
    "birthdate": "1991-06-10T02:00:00.000Z",
    "email": "ericsterli@gmail.com",
    "password": "Tigre2023"
}
Responses
Code	Description
201	  User created successfully!
409	  User already exists

##Logueo
{
    "user":"ericsterli@gmail.com",
    "password":"Tigre2023"
}
Responses
Code	Description
200	  {auth: true,token:token}
401	  {auth: false,message:'User or password doesnt exist / or is incorrect'}
>>>>>>> 48d0f0f2722916dfb1202f332dc2fba49771a0de
