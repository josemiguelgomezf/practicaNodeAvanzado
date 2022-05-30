'use strict';

const { config } = require('dotenv');
const nodemailer = require('nodemailer');

module.exports = async function() {
    //Development.
    const testAccount = await nodemailer.createTestAccount();

    const developConfig = {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    }

    const transport = nodemailer.createTransport(developConfig);

    return transport;
}