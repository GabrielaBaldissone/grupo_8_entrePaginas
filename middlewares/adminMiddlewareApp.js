function adminMiddleware(req, res, next) {
    res.locals.isAdmin = false;
    if (req.session.userLogged && req.session.userLogged.rol === "admin") {
        res.locals.isAdmin = true;
    }
    
    next();
}

module.exports = adminMiddleware;