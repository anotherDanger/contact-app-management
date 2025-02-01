import express from 'express';
import { router } from '../routes/routes.js';
import { generateJWT } from "../middlewares/token.js";
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// Gunakan generateJWT hanya untuk route tertentu, misalnya route /user
app.use('/user', generateJWT);  // Ini hanya akan diterapkan untuk route /user

app.use(router);

export default app;
