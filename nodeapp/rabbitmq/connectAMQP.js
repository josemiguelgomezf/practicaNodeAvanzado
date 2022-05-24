'use strict';
const config = require('../config');

require('dotenv').config();

const amqplib = require('amqplib'); // si queréis usar callbacks: amqplib/callback_api

const connectionPromise = amqplib.connect(config.RABBITMQ);

module.exports = connectionPromise;