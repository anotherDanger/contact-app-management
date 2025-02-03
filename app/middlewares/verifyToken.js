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

    console.log('Token yang diterima:', token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        console.log('Token valid, user:', decoded);

        req.user = decoded;
        next();
    } catch (err) {

        if (err.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Token telah kedaluwarsa', expiredAt: err.expiredAt });
        }

        return res.status(403).json({ message: 'Token tidak valid', error: err.message });
    }
};
