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
        if(!usuario || !(await usuario.comparePassword(password))){
            res.locals.error = res.__('Invalid credentials');
            res.render('login')
            return
        }
        //apunto en la session que está logueado
        req.session.usuarioLogged = {
            _id: usuario._id
        };
        res.redirect('/privado'); 
    }
    catch(error){
        next(error);
    }

}

    logout(req, res, next){
        req.session.regenerate(err => {
           if(err){
               next(err);
               return;
           } 
           res.redirect('/');
        })
    }

}


module.exports = LoginController;