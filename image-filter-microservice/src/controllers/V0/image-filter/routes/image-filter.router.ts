import { Router, Request, Response } from 'express';

import { filterImageFromURL, deleteLocalFiles } from '../../../../util/util';

const router: Router = Router();

/**
 * Route: http://{{host}}/api/v0/filteredimage?image_url={{public image url}}
 *
 * Get an image from a public url and apply predefined filters.
 * @returns The filtered image if ok otherwise an error response.
 */
router.get('/', async (req: Request, res: Response) => {
    // Retrieve the image url from a query parameter
    const image_url = req.query.image_url as string;

    // Sends an error response in case the query parameter is missing
    if (!image_url) res.status(400).json({ error: { message: 'Missing public image URL to be filtered!' } });

    // Filtered file path
    let filteredFilePath: string;

    try {
        // Filter the image and gets it's saved local path
        filteredFilePath = await filterImageFromURL(image_url);
        // Send the filtered file in the response
        res.status(200).sendFile(filteredFilePath, async (error) => {
            if (error) {
                // An error happened, rethrow it
                throw new Error(`Error while sending the file: ${error.message}`);
            }
            // After file transfer finishes, delete it from tmp folder
            await deleteLocalFiles([filteredFilePath]);
        });
    } catch (error) {
        // An error occurred, thus send the error response
        res.status(500).json({ error: { message: error.message } });
    }
});

// The image filter router
export const ImgFilterRouter: Router = router;
