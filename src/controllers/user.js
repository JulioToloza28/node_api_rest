const { pool } = require("./db");
const { User } = require("../models/user");
const userQuery = require("../requests/userQuery");
const bcrypt = require("bcrypt");

const getUsers = (request, response) => {
  try {
    pool.query(userQuery.getUsersQry, (error, result) => {
      if (error) throw error;
      if (result.rows.length == 0) {
        return response.status(204).json({ message: "No content" });
      }
      return response.status(200).json(result.rows);
    });
  } catch (error) {
    throw new Error("Error en getUsers " + error);
  }
};
const getUserById = (request, response) => {
  try {
    const id = parseInt(request.params.id);
    if(request.params.id == undefined){
      response.status(400).send(`To search for the user add the id`);
    }
    pool.query(userQuery.getUserByIdQry, [id], (error, result) => {
      if (error) throw error;
      let data = result.rows[0];
      //console.log({data})
      if (data == undefined) {
        return response
          .status(404)
          .json({ message: "The searched user is not loaded in the database" });
      } else {
        if (!data.condition) {
          response.status(401).json();
        }
        let user = new User(
          data.id,
          data.name,
          data.birthdate,
          data.email,
          data.password,
          data.condition
        );
        return response.status(200).json(user);
      }
    });
  } catch (error) {
    throw new Error("Error en getUserById " + error);
  }
};
const addUser = async (request, response) => {
  try {
    let user = new User(
      null,
      request.body.fullname,
      request.body.birthdate,
      request.body.email,
      request.body.password,
      null
    );
    // check if email exists
    if (
      request.body.fullname != undefined &&
      request.body.birthdate != undefined &&
      request.body.email != undefined &&
      request.body.password != undefined
    ) {
      pool.query(
        userQuery.checkEmailExists,
        [user.email],
        async (error, result) => {
          if (result.rowCount > 0) {
            return response.status(409).send(`User already exists`);
          } else {
            //add user to db
            let pass = bcrypt.hashSync(user.password, 10);
            let values = [user.fullname, user.birthdate, user.email, pass];
            pool.query(userQuery.addUserQry, values, (error, result) => {
              if (error) throw error;
              //crear token
              return response.status(201).send(`User created successfully!`);
            });
          }
        }
      );
    } else {
      return response
        .status(400)
        .send(`The user cannot be created due to lack of data`);
    }
  } catch (error) {
    throw new Error("Error en addUser " + error);
  }
};
const updateUser = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    pool.query(userQuery.getUserByIdQry, [id], (error, result) => {
      const noUserFount = !result.rows.length;
      if (noUserFount) {
        return res.status(401).send("User does not exist in the database");
      } else {
        console.log(req.body);
        const values = [
          req.body.fullname,
          req.body.birthdate,
          req.body.email,
          req.body.password,
          id,
        ];
        if(values.includes(undefined)){
          return res.status(400).send(`Changes cannot be made due to lack of data`);
        }
        console.log(values);
        pool.query(userQuery.updateUserQry, values, (error, result) => {
          if (error) {
            console.log(error);
            throw error;
          }
          return res.status(200).send("User updated successfully");
        });
      }
    });
  } catch (error) {
    throw new Error("Error en updateUser " + error);
  }
};
const deactivateUser = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if(id == undefined){
      return res.status(400).send(`To delete the user, you must pass the ID`);
    }
    pool.query(userQuery.deactivateUserQry, [id], (error, result) => {
      if (error) {
        console.log(error);
        throw error;
      }
      console.log({ result });
      if (result.rowCount == 0) {
        return res.status(404).send("User does not exist in the database");
      } else {
        return res.status(200).send("User delete successfully");
      }
    });
  } catch (error) {
    throw new Error("Error en deactivateUser " + error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deactivateUser,
};
