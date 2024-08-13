const path = require("node:path");
const dataSource = require("../services/dataSource");
const usersFilePath = path.join(__dirname, '../data/users.json')


const User = {
    generateId(){
        const allUsers = this.findAll();
        const newId = allUsers.length ? allUsers[allUsers.length - 1].id + 1 : 1;
        return newId; 
    },
    findAll(){
        return dataSource.load(usersFilePath);
    },
    findById(id){
        const allUsers = this.findAll();
        const userFound = allUsers.find(user => user.id == id);
        return userFound;
    },
    findByField(field, text){
        const allUsers = this.findAll();
        const userFound = allUsers.find(user => user[field] == text);
        return userFound;
    },
    create(userData){
        const allUsers = this.findAll();
        const newUser = {
            id: this.generateId(),
            ...userData
        }
        allUsers.push(newUser);
        dataSource.save(usersFilePath, allUsers);
        return newUser;
    },
    deleteById(id){
        const allUsers = this.findAll();
        const finalUsers = allUsers.filter(user => user.id != id);
        dataSource.save(usersFilePath, finalUsers);
        return true;
    }
}

module.exports = User;
