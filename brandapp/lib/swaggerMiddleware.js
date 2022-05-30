'use strict';

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    info: {
      title: 'Brand API',
      version: '0.1',
      description: 'Ads API'
    }
  },
  //Apis: ['swagger.yaml']
  apis: ['./routes/**/*.js']
};

const specification = swaggerJSDoc(options);

module.exports = [swaggerUi.serve, swaggerUi.setup(specification)];