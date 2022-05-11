'use strict';

const jwt = require ('jsonwebtoken');
const config = require ('../config')

//Módulo que exporta un middleware

module.exports = (req,res,next) => {
    //recoger jwtToken del header o de la query-string o del body
    const jwtToken = req.get('Authorization') || req.query.token || req.body.token
    // comprobar que me ha dado un token
    if (!jwtToken){
        const error = new Error('no token');
        error.status = 401;
        next(error);
    }
    //comprobar que el token es valido
jwt.verify(jwtToken, config.JWTPASS, (err, payload)=>{
    if(err){
        err.status=401;
        next(err);
        return;
    }
    req.apiUserId = payload._id;
    //si es valido continuo
    next();
});
}