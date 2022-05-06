const express = require('express');
const router = express.Router();

router.get('/:locale',(req, res, next) => {
    //recoger parametro del locale al que hay que cambiar
    const locale = req.params.locale;
    //poner una cookie que indique el nuevo locale
    res.cookie('nodeapp-locale', locale, {maxAge: 1000 * 60 * 60 * 24 * 7});
    //redirección del sitio del que vengo
    res.redirect(req.get('Referer'));
});

module.exports = router