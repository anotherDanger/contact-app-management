import express from 'express';
import {router} from '../routes/routes.js';
import { verifyToken } from '../middlewares/verify.js';
const app = express();

app.use(verifyToken);

app.use(router);

export default app;