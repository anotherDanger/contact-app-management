import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Token tidak ditemukan, akses ditolak' });
    }

    const token = authHeader.split(' ')[1]; // Ambil token setelah Bearer

    if (!token) {
        return res.status(401).json({ message: 'Token tidak ditemukan, akses ditolak' });
    }

    console.log('Token yang diterima:', token); // Debug token yang diterima

    try {
        // Cek apakah token valid dan tidak kadaluarsa
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        console.log('Token valid, user:', decoded); // Debug informasi yang terkandung dalam token

        req.user = decoded; // Menyimpan informasi user di request
        next(); // Lanjutkan ke route berikutnya
    } catch (err) {
        // Menangani kesalahan jika token tidak valid atau kadaluarsa
        if (err.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Token telah kedaluwarsa', expiredAt: err.expiredAt });
        }

        return res.status(403).json({ message: 'Token tidak valid', error: err.message });
    }
};
