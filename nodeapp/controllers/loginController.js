'use strict';

const Usuario = require('../models/Usuario.js');
const config = require('../config.js');
const jwt = require('jsonwebtoken');
class LoginController {
index(req, res, next){
    res.locals.error='';
    res.render('login')
}
//login post website
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
        
        //enviar un email al usuario
        usuario.enviarEmail('Bienvenido', 'Bienviendio a NodeApp')

        //redirigir al usuario
        res.redirect('/privado'); 
    }
    catch(error){
        next(error);
    }

}
//login post api
async postJWT(req, res, next){
    try{
        const {email, password} = req.body;
    
        //buscar usuario
        const usuario = await Usuario.findOne({email});
        //si no encuentro o pass dist
        if(!usuario || !(await usuario.comparePassword(password))){
            res.json({error: 'invalid credentials'})
            return
        }
        //generamos un json
    jwt.sign({_id:usuario._id}, config.JWTPASS, {expiresIn:"2d"}, (err, jwtToken) => {
    if(err){
        next(err);
        return;
    }
    //devolver token general
    res.json({token: jwtToken});
});

        
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