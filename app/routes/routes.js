import { Router } from 'express';

export const router = Router();

router.post('/user', (req, res) => {
    res.send('Hello World');
});
