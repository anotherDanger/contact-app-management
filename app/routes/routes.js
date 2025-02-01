import { Router } from "express";
import { verifyToken } from "../middlewares/verify.js";

export const router = Router();

router.get('/user', verifyToken, (req, res) => {
    res.send('Hello World');
});
