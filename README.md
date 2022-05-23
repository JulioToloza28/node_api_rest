# node_api_rest

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
