    const datos = {
        activar: true
    }

const usersController = {
    login: (req, res) => {

    res.render("users/login", {'datos': datos});
    },
    register: (req, res) => {
    
    res.render("users/register", {'datos': datos});
    }
};

module.exports = usersController;