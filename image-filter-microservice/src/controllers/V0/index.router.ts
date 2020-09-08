import { Router, Request, Response } from 'express';

import { ImgFilterRouter } from './image-filter/routes/image-filter.router';

const router: Router = Router();

router.use('/filteredimage', ImgFilterRouter);

// Send a description of this router root
router.get('/', async (req: Request, res: Response) => {
    res.send(`V0`);
});

// The index router compiling all nested routers
export const IndexRouter: Router = router;
