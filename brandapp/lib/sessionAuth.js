'use strict'

module.exports = (req, res, next) => {
    if (!req.session.usuarioLogged) {
        res.redirect('/login');
        return;
    }
    next();
}