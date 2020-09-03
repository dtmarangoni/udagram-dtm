import { Router, Request, Response } from 'express';
import { FeedItem } from '../models/FeedItem';
import { requireAuth } from '../../users/routes/auth.router';
import * as AWS from '../../../../aws';

const router: Router = Router();

// Get all feed items
router.get('/', async (req: Request, res: Response) => {
    const items = await FeedItem.findAndCountAll({ order: [['id', 'DESC']] });

    // Get from AWS S3 a signed url to user have direct
    // access to the object
    items.rows.map((item) => {
        if (item.url) {
            item.url = AWS.getGetSignedUrl(item.url);
        }
    });

    // Respond with fetched items
    res.status(200).send(items);
});

// Get a specific resource by Primary Key
router.get('/:id', async (req: Request, res: Response) => {
    const item = await FeedItem.findByPk(req.params.id);
    // No item in DB for the given ID
    if (!item) res.status(404).json({ error: { message: 'No feed found for this ID.' } });

    // Get from AWS S3 a signed url to user have direct
    // access to the object
    item.url = AWS.getGetSignedUrl(item.url);

    // Respond with the found feed item
    res.status(200).json(item);
});

// Update a specific resource
router.patch('/:id', requireAuth, async (req: Request, res: Response) => {
    const item = await FeedItem.findByPk(req.params.id);
    // No item found for the given ID
    if (!item) res.status(404).json({ error: { message: 'No feed found for this ID.' } });

    // Update the feed item according to the given fields
    if (req.body.caption) item.caption = req.body.caption;
    if (req.body.url) item.url = req.body.url;
    // Save the changes in DB
    await item.save();

    // Get from AWS S3 a signed url to user have direct
    // access to the object
    item.url = AWS.getGetSignedUrl(item.url);

    // Respond with the updated item
    res.status(200).json(item);
});

// Get a signed url to user be able to put a new item in the bucket
router.get('/signed-url/:fileName', requireAuth, async (req: Request, res: Response) => {
    let { fileName } = req.params;
    // Get the signed url
    const url = AWS.getPutSignedUrl(fileName);
    // Respond with the signed url
    res.status(201).send({ url: url });
});

// Post meta data and the filename after a file is uploaded
// NOTE the file name is they key name in AWS S3 bucket.
// body : {caption: string, fileName: string};
router.post('/', requireAuth, async (req: Request, res: Response) => {
    const caption = req.body.caption;
    const fileName = req.body.url;

    // Check if the caption is valid
    if (!caption) {
        return res.status(400).json({ error: { message: 'Caption is required or malformed' } });
    }

    // Check if the filename is valid
    if (!fileName) {
        return res.status(400).send({ error: { message: 'File url is required' } });
    }

    // Create the new feed item
    const item = new FeedItem({
        caption: caption,
        url: fileName,
    });

    // Save the feed item in DB
    const saved_item = await item.save();

    // Get from AWS S3 a signed url to user have direct
    // access to the object
    saved_item.url = AWS.getGetSignedUrl(saved_item.url);

    // Respond with the created and saved feed item
    res.status(201).send(saved_item);
});

// The feed router
export const FeedRouter: Router = router;
