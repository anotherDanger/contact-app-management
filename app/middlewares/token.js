import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateJWT = (req, res, next) => {
    const { username } = req.body;

    // Cek apakah username ada
    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    // Payload untuk token
    const payload = {
        username: username
    };

    // Generate JWT token
    jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '7d' }, (err, token) => {
        if (err) {
            return res.status(500).json({ message: 'Error generating token' });
        }

        req.token = token;
        console.log('Token yang dihasilkan:', token);

        next();
    });
};
