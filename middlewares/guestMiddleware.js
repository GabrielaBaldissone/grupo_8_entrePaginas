function guestMiddleware(req, res, next){
    if(req.session.userLogged){
        // return res.redirect("/users/profile")
        return res.send("Si estas logeado");
    }
    next();
}

module.exports = guestMiddleware;