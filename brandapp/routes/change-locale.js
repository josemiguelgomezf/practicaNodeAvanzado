const express = require('express');
const router = express.Router();

router.get('/:locale',(req, res, next) => {
    //Catch the parameter to change.
    const locale = req.params.locale;
    //Set a cookie to indicate the locale.
    res.cookie('brandapp-locale', locale, {maxAge: 1000 * 60 * 60 * 24 * 7});
    //Redirect from site to have been came.
    res.redirect(req.get('Referer'));
});

module.exports = router