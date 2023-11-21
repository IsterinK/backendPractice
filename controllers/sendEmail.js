const nodemailer = require('nodemailer');
const fs = require('fs')
const User = require('../model/user');
const jwt = require("../utils/jwt")
const userController = require("./user")
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        /* user: 'manuel121938@gmail.com',
        pass: 'zdsf ubzd xsqe cnat' */
        user: 'estebanpatinogaviria@gmail.com',
        pass: 'xvha szrp rzij luwc'
    }
});



const sendEmailRegister = async (user) => {
    const response = await User.find()
    const admins = response.filter((user) => user.rol === "admin")
    const adminsEmails = admins.map(admin => admin.email)
    const mailOptionsUser = {
        from: 'estebanpatinogaviria@gmail.com',
        to: `${user.email}`,
        subject: 'Se registro con exito',
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
                
                <img src="cid:unique@nodemailer.com" alt="Logo">
                <h3>Bienvenido ${user.name}</h3>
                <p> Se realizo el registro con exito </p>
                <p>Se te notificara cuando se active tu cuenta y puedas ingresar a la pagina</p>

                

            </body>
            </html>
        `
    };

    const mailOptionsAdmin = {
        from: 'estebanpatinogaviria@gmail.com',
        to: adminsEmails,
        subject: 'Nuevo Usuario',
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
                
                <img src="cid:unique@nodemailer.com" alt="Logo">
                <h3>Se registro un nuevo usuario a nombre de ${user.name}</h3>
                <p>Activalo lo mas pronto posible </p>

            </body>
            </html>
        `
    };

    transporter.sendMail(mailOptionsUser, (error, info) => {
        if(error){
            console.log(error);
        }
    })

    transporter.sendMail(mailOptionsAdmin, (error, info) => {
        if(error){
            console.log(error);
        }
    })
}

const sendEmailActive = async (user) => {
    const response = await User.find()
    const admins = response.filter((user) => user.rol === "admin")
    const adminsEmails = admins.map(admin => admin.email)
    const mailOptionsUser = {
        from: 'estebanpatinogaviria@gmail.com',
        to: `${user.email}`,
        subject: 'Se activó la cuenta con exito',
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
                
                <img src="cid:unique@nodemailer.com" alt="Logo">
                <h3>Bienvenido ${user.name}</h3>
                <p> La cuenta ha sido activada con exito </p>
                <p>Ya puede acceder a la pagina</p>

                

            </body>
            </html>
        `
    };
    transporter.sendMail(mailOptionsUser, (error, info) => {
        if(error){
            console.log(error);
        }
    })

}

module.exports = {
    sendEmailRegister,
    sendEmailActive
}

  