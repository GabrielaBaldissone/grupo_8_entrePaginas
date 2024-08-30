function adminMiddleware(req, res, next) {
    res.locals.isAdmin = false;

    if (req.session.userLogged && req.session.userLogged.rol === "admin") {
        res.locals.isAdmin = true;
        next(); // Continúa si es administrador
    } else {
        // Solo redirigir si el usuario intenta acceder a la ruta de edición
        if (req.path.includes('/edit/')) {
            res.redirect(`/products/detail/${req.params.id}`);
        } else {
            next(); // Permitir el acceso a otras rutas sin redirección
        }
    }
}

module.exports = adminMiddleware;
