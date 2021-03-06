// The Node Express entrance point

import express from 'express';
import { sequelize } from './sequelize';
import bodyParser from 'body-parser';

import { setCORS } from './CORS.middleware';
import { IndexRouter } from './controllers/v0/index.router';
import { V0MODELS } from './controllers/v0/model.index';

// The main method
(async () => {
    // Add or update the models in DB if needed
    await sequelize.addModels(V0MODELS);
    await sequelize.sync();

    // Create the Node Express App
    const app = express();
    // Default port to listen
    const port = process.env.PORT || 8085;

    // Body parser middleware
    app.use(bodyParser.json());

    // CORS should be restricted
    app.use(setCORS);

    // The router to use for API version V0
    app.use('/api/v0/', IndexRouter);

    // Root URI call
    app.get('/', async (req, res) => {
        return res.send('Backend REST API');
    });

    // Start the Node Express server
    app.listen(port, () => {
        console.log(`server running http://localhost:${port}`);
        console.log(`press CTRL+C to stop server`);
    });
})();
