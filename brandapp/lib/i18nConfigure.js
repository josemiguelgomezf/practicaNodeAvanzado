'use strict';

const i18n = require('i18n');
const path = require('path');

i18n.configure({
locales: ['en', 'es'],
directory: path.join(__dirname, '..', 'locales'),
defaultLocale: 'en',
//Watch for changes in JSON and reload.
autoReload: true, 
syncFiles: true,
cookie: 'brandapp-locale'
});

//For use in scripts.
i18n.setLocale('en');
module.exports = i18n;