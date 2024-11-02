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
    createUser: async (req, res) => {
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
            return res.render("users/register", {
                errors: errors.mapped(),
                oldData: req.body,
                datos
            });
        }
    
        const { firstName, lastName, email, phone, password } = req.body;
        const image = req.file ? req.file.filename : "default.png";
    
        try {
            const userInDB = await db.User.findOne({ where: { email } });
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
    
            await db.User.create({
                first_name: firstName,
                last_name: lastName,
                email,
                phone,
                password: bcryptjs.hashSync(password, 10),
                rol: "cliente",
                image
            });
    
            return res.redirect("/users/login");
        } catch (error) {
            console.error(error);
            return res.render("users/register", {
                errors: { general: { msg: "Ocurrió un error al crear el usuario" } },
                oldData: req.body,
                datos
            });
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
                        res.cookie("userEmail", email, { maxAge: (10000*60) * 10 });
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
    },
    editUser: async (req, res) => {
        try {
            const { id } = req.params;
    
            // Obtén el producto y las categorías utilizando async/await
            const user = await db.User.findByPk(id);
            // Renderiza la vista con los datos obtenidos
            res.render("users/editUser", { datos, user, oldData: null});
        } catch (error) {
            console.error("Error al editar el usuario:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    updateUser: async (req, res) => {
        const errors = validationResult(req);
        const { id } = req.params;
        
        if (!errors.isEmpty()) {
            const user = await db.User.findByPk(id);
            return res.render("users/editUser", {
                errors: errors.mapped(),
                oldData: req.body,
                datos,
                user
            });
        }        


        const { firstName, lastName, phone } = req.body;
        let newImage = req.file ? req.file.filename : null;
    
        const user = await db.User.findByPk(id);
        try {
            if (req.file.filename == "default-profile.jpg") {
                newImage = user.image;
            }
            await db.User.update(
                {
                    first_name: firstName,
                    last_name: lastName,
                    phone,
                    image: newImage,
                },
                {
                    where: { id_user: id }
                }
            );
            res.redirect(`/users/profile`);
        } catch (err) {
            console.error(err.message);
            res.render("users/editUser", {
                errors: { general: { msg: "Ocurrió un error al actualizar el usuario" } },
                oldData: req.body,
                user,
                datos: {}
            });
        }
    }
    
};

module.exports = usersController;