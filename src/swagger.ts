import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NODE,TS STARTER PROJECT API Documentation',
      version: '1.0.0',
      description: 'API documentation for User, Blog(Basic), , Admin, and Auth services',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
       
      },
    ],
  },
  apis: ['./src/app.ts', './src/module/**/*.ts'],  
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

export default swaggerSpec;
