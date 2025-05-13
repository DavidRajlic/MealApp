// backend/swagger.js

const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MealApp API',
      version: '1.0.0',
      description: 'REST API za MealApp',
    },
    servers: [
      {
        url: 'https://mealapp-psnv.onrender.com', 
      },
    ],
  },
  apis: ['./routes/*.js'], // Pot do datotek z JSDoc komentarji
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
