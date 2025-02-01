import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
export const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Token tidak ditemukan, akses ditolak' });
    }
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token tidak ditemukan, akses ditolak' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = decoded;
        console.log("jalan");
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token tidak valid atau telah kedaluwarsa' });
    }
};
