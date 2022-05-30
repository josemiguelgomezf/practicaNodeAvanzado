'use strict';

const Usuario = require('../models/Usuario.js');
const config = require('../config.js');
const jwt = require('jsonwebtoken');

class LoginController {
index(req, res, next){
    res.locals.error='';
    res.render('login')
}
//Login website.
async post(req, res, next){
    try{
        const {email, password} = req.body;
    
        //Seach user.
        const usuario = await Usuario.findOne({email});

        //If there is not user or password is not correct.
        if(!usuario || !(await usuario.comparePassword(password))){
            res.locals.error = res.__('Invalid credentials');
            res.render('login')
            return
        }
        //Point in the session user is logged in.
        req.session.usuarioLogged = {
            _id: usuario._id
        };
        
        //Send email to the user!
        usuario.enviarEmail('Welcome!', 'Welcome to Brand!')

        //Redirect to 'privado'.
        res.redirect('/privado'); 
    }
    catch(error){
        next(error);
    }

}
//Login API.
async postJWT(req, res, next){
    try{
        const {email, password} = req.body;
    
        //Seach user.
        const usuario = await Usuario.findOne({email});
        if(!usuario){
            res.json({error: 'User does not exist!'})
            return
        }
        //If there is not user or password is not correct.
        if(!usuario || !(await usuario.comparePassword(password))){
            res.json({error: 'Invalid credentials!'})
            return
        }
    //Create a json.
    jwt.sign({_id:usuario._id}, config.JWTPASS, {expiresIn:"2d"}, (err, jwtToken) => {
    if(err){
        next(err);
        return;
    }
    //Return token.
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