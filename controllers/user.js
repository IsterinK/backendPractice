const User = require('../model/user')
const bcrypt = require("bcrypt")
const jwt = require("../utils/jwt")
const sendEmail = require("./sendEmail")
// LogIn

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userStore = await User.findOne({ email: email });
    if (!userStore) {
      throw new Error("El usuario no existe");
    }
    const check = await bcrypt.compare(password, userStore.password);
    if (!check) {
      throw new Error("Contraseña incorrecta");
    }
    res.status(200).send({
      access: jwt.createAccessToken(userStore),
      refresh: jwt.createRefreshToken(userStore)
    });
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// Register User

const register = async (req, res) => {
  const { name, lastname, email, password, documentType, identification} = req.body;

  if(name  && lastname  && email  && password && documentType  && 
      identification !== null){

          const crypt = await bcrypt.genSalt(10)
          const crypt_password = await bcrypt.hash(password, crypt)

          const new_user = await User({
              name, lastname, email: email.toLowerCase(), password: crypt_password, documentType, identification
          })
          try {
              const userDB = await new_user.save()
              await sendEmail.sendEmailRegister(userDB)
              res.status(201).json(userDB)
          } catch (error) {
              res.status(400).json("La identificación ya fue registrada")
          } 
  } else {
      res.status(400).json("Faltan Campos requeridos")
  }
}

const getAllUsers = async(req, res) => {
    try {
      const response = await User.find()
      res.status(200).json(response);
      return response;
    } catch (error) {
      res.status(400).json(error);
    }
      
};

const deleteUser =async (req, res) => {
    try {
      const { userId } = req.params
      await User.findByIdAndDelete(userId)
      res.status(200).json({ message: "Usuario eliminado"})
    } catch (error) {
      res.status(400).json(error)
    } 
  }

module.exports = {
    login,
    register,
    getAllUsers,
    deleteUser
}