const bcryptjs  = require("bcryptjs");
const User = require("../models/User");
const { validationResult } = require("express-validator");

const datos = {
    activar: true
}

const usersController = {
    users: null,
    login: (req, res) => {
        res.render("users/login", {'datos': datos});
    },
    register: (req, res) => {
        res.render("users/register", {'datos': datos});
    },
    createUser: (req, res) =>{
        const errors = validationResult(req);
        if(errors.isEmpty()){
            const {firstName, lastName, email, phone, password} = req.body;
            const userInDB = User.findByField("email", email);
            if(userInDB){
                return res.render("users/register", {
                    errors: {
                        email: {
                            msg: "Este email ya está registrado"
                        }
                    },
                    oldData: req.body, datos});
            }
            const newUser = {
                firstName,
                lastName,
                email,
                phone,
                password: bcryptjs.hashSync(password, 10)
            };
            const userCreated = User.create(newUser);
            return res.redirect("/users/login");
        }else{
            return res.render("users/register", {errors: errors.mapped(), oldData: req.body, datos});
        }
    }
};

module.exports = usersController;