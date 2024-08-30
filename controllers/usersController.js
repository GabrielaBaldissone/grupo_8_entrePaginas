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
    },
    loginProcess(req, res){
        const { email, password, rememberMe } = req.body;
        
        const userToLogin = User.findByField("email", email);
        if(userToLogin){
            const isOkThePassword = bcryptjs.compareSync(password, userToLogin.password);
            if(isOkThePassword){
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                if(rememberMe){
                    res.cookie("userEmail", email, { maxAge: (1000*60) * 10 });
                }
                return res.redirect("/users/profile");
            }else{
                return res.render("users/login", {
                    errors:{
                        password: {
                            msg: "La contraseña que ingresaste es incorrecta"
                        }
                    },
                    oldData: req.body,
                    datos
                })
            }
        }else{
            return res.render("users/login", {
                errors:{
                    email: {
                        msg: "Este email no se encuentra registrado"
                    }
                },
                oldData: req.body,
                datos
            })
        }
    },
    getUserProfile(req, res){
        return res.render("users/userProfile", {user: req.session.userLogged, datos});
    },
    logout(req, res){
        res.clearCookie("userEmail");
        req.session.destroy();
        return res.redirect("/users/login");
    }
};

module.exports = usersController;