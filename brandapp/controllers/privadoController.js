'use strict';

const  Usuario  = require('../models/Usuario')
class PrivadoController {
async index(req, res, next){
    try{
        const usuarioId = req.session.usuarioLogged._id

        const usuario = await Usuario.findById(usuarioId)
    
        if(!usuario){
            next(new Error('User does not exist'))
            return;
        }
    
        res.render('privado', {email: usuario.email})
    }catch (err){
        next(err)
        return;
    }
   
}
}

module.exports=PrivadoController;