const fs = require('fs');
const path = require('path');

const datos = {
    activar: true
}

//users.json
const usersFilePath = path.join(__dirname, '../data/users.json');
const fileUsers = fs.readFileSync(usersFilePath, 'utf-8');

const usersController = {
    login: (req, res) => {

        res.render("users/login", {'datos': datos});
    },
    register: (req, res) => {
    
        res.render("users/register", {'datos': datos});
    },
    createUser: (req, res) =>{
        const {firstName, lastName, email, phone, password} = req.body;
        const users = JSON.parse(fileUsers);
        const newUser = {
            id: users.length ? users[users.length - 1].id + 1: 1,
            firstName,
            lastName,
            email,
            phone,
            password
        };
        users.push(newUser);
        const usersJSON = JSON.stringify(users);
        fs.writeFileSync(usersFilePath, usersJSON);
        res.redirect("/users/login");
    }
};

module.exports = usersController;