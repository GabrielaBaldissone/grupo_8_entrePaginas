const User = require("../models/User");

// Pasar la session a las vistas
function userLoggedMiddleware(req, res, next){
    res.locals.isLogged = false;

    const emailInCookie = req.cookies.userEmail;
    const userFromCookie = User.findByField("email", emailInCookie);

    if(userFromCookie){
        req.session.userLogged = userFromCookie;
    }


    if(req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = userLoggedMiddleware;