import express from 'express';
import { router } from '../routes/routes.js';
import { generateJWT } from "../middlewares/token.js";
import { verifyJWT } from "../middlewares/verifyToken.js";
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use('/user', generateJWT);
app.use('/protected', verifyJWT);
app.use(router);

export default app;
