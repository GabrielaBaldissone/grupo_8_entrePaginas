const db = require("../database/models");

function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;

    const emailInCookie = req.cookies.userEmail;
    if (emailInCookie) {
        db.User.findOne({ where: { email: emailInCookie } })
            .then(userFromCookie => {
                if (userFromCookie) {
                    req.session.userLogged = userFromCookie;
                }

                if (req.session.userLogged) {
                    res.locals.isLogged = true;
                    res.locals.userLogged = req.session.userLogged;
                }

                next();
            })
            .catch(error => {
                console.error(error);
                next();
            });
    } else {
        if (req.session.userLogged) {
            res.locals.isLogged = true;
            res.locals.userLogged = req.session.userLogged;
        }
        next();
    }
}

module.exports = userLoggedMiddleware;