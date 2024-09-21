const bcryptjs  = require("bcryptjs");
const db = require("../database/models");
const { validationResult } = require("express-validator");

const datos = {
    activar: true
}

const usersController = {
    login: (req, res) => {
        res.render("users/login", {'datos': datos});
    },
    register: (req, res) => {
        res.render("users/register", {'datos': datos});
    },
    createUser: (req, res) => {
        const errors = validationResult(req);
    
        if (errors.isEmpty()) {
            const { firstName, lastName, email, phone, password } = req.body;
    
            db.User.findOne({ where: { email } })
                .then(userInDB => {
                    if (userInDB) {
                        return res.render("users/register", {
                            errors: {
                                email: {
                                    msg: "Este email ya está registrado"
                                }
                            },
                            oldData: req.body,
                            datos
                        });
                    }
    
                    return db.User.create({
                        first_name: firstName,
                        last_name: lastName,
                        email,
                        phone,
                        password: bcryptjs.hashSync(password, 10),
                        rol: "rol"
                    });
                })
                .then(() => {
                    return res.redirect("/users/login");
                })
                .catch(error => {
                    console.error(error);
                    return res.render("users/register", {
                        errors: { general: { msg: "Ocurrió un error al crear el usuario" } },
                        oldData: req.body,
                        datos
                    });
                });
        } else {
            return res.render("users/register", { errors: errors.mapped(), oldData: req.body, datos });
        }
    },
    loginProcess(req, res){
        const { email, password, rememberMe } = req.body;
        
        db.User.findOne({where:{email}})
        .then((userToLogin)=>{
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
        })
        .catch(error => {
            console.error(error);
            return res.render("users/login", {
                errors: {
                    general: {
                        msg: "Ocurrió un error al intentar iniciar sesión, por favor inténtalo nuevamente."
                    }
                },
                oldData: req.body,
                datos
            });
        });
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