import { Router, Request, Response } from 'express';
import { FeedRouter } from './feed/routes/feed.router';
import { UserRouter } from './users/routes/user.router';

const router: Router = Router();

router.use('/feed', FeedRouter);
router.use('/users', UserRouter);

// Send a description of this router root
router.get('/', async (req: Request, res: Response) => {
    return res.send(`V0`);
});

// The index router compiling all nested routers
export const IndexRouter: Router = router;
