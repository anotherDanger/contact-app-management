import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateJWT = (req, res, next) => {
    const { username, password } = req.body;

    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    const payload = {
        username: username
    };

    jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
        if (err) {
            return res.status(500).json({ message: 'Error generating token' });
        }

        req.token = token;
        req.password = password;
        next();
    });
};
