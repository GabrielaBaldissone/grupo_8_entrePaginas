const path = require('path');

const usersController = {
    login: (req, res) => {
        res.render(path.resolve('./views/users/login'));
    },
    register: (req, res) => {
        res.render(path.resolve('./views/users/register'));
    }
};

module.exports = usersController;