'use strict';

const jwt = require ('jsonwebtoken');
const config = require ('../config')

//Exports a middleware.
module.exports = (req,res,next) => {
    //Catch jwtToken from header or from query-string or from body.
    const jwtToken = req.get('Authorization') || req.query.token || req.body.token
    //Check if the token is valid.
    if (!jwtToken){
        const error = new Error('No token.');
        error.status = 401;
        next(error);
    }
    
//Check if the token is valid.
jwt.verify(jwtToken, config.JWTPASS, (err, payload)=>{
    if(err){
        err.status=401;
        next(err);
        return;
    }
    req.apiUserId = payload._id;
    //If token is valid, continue.
    next();
});
}