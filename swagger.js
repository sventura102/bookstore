const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Book Collectioon API'
  },
  host: 'books-z7vs.onrender.com/',
  schemes: ['https']
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);