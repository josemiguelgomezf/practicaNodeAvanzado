'use strict';

const Usuario = require('../models/Usuario.js');
class LoginController {
index(req, res, next){
    res.locals.error='';
    res.render('login')
}
async post(req, res, next){
    try{
        const {email, password} = req.body;
    
        //buscar usuario
        const usuario = await Usuario.findOne({email});
        //si no encuentro o pass dist
        if(!usuario || usuario.password !== password){
            res.locals.error = res.__('Invalid credentials');
            res.render('login')
            return
        }
        res.redirect('/privado');
        
    }
    catch(error){
        next(error);
    }

}

}


module.exports = LoginController;