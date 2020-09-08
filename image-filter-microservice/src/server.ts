import express from 'express';
import bodyParser from 'body-parser';

import { filterImageFromURL, deleteLocalFiles } from './util/util';
import { IndexRouter } from './controllers/V0/index.router';

// The server main entrance function
(async () => {
    // Init the Express application
    const app = express();

    // Set the network port
    const port = process.env.PORT || 8082;

    // Use the body parser middleware for post requests
    app.use(bodyParser.json());

    // The router to use for API version V0
    app.use('/api/v0', IndexRouter);

    // Root Endpoint
    // Displays a simple message to the user
    app.get('/', async (req, res) => {
        res.send('try GET /api/v0/filteredimage?image_url={{}}');
    });

    // Start the Server
    app.listen(port, () => {
        console.log(`server running http://localhost:${port}`);
        console.log(`press CTRL+C to stop server`);
    });
})();
