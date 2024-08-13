const User = require("../models/User");

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
        const {firstName, lastName, email, phone, password} = req.body;
        const newUser = {
            firstName,
            lastName,
            email,
            phone,
            password
        };
        User.create(newUser);
        res.redirect("/users/login");
    }
};

module.exports = usersController;