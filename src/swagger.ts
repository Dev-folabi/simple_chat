import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';


const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Simple Chat API',
            version: '1.0.0',
            description: 'API documentation for the Simple Chat application',
        },
        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
    },
    apis: ['./src/routes/*.ts'], // Adjust the path according to your project structure
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export const setupSwagger = (app: Application) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};