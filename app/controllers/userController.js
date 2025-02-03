import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (req, res) => {
    const { username, password } = req.body;
    const token = req.token;

    try {
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        // Hash password sebelum disimpan
        const hashedPassword = await bcrypt.hash(password, 10); // 10 adalah salt rounds

        // Membuat user baru dengan password yang sudah di-hash
        const newUser = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });

        res.status(201).json({
            message: 'Success',
            user: newUser,
            token: token,
        });
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({
                error: `Username ${username} is already taken. Please choose another one.`,
            });
        }

        console.error(error);
        res.status(500).json({ error: 'Something went wrong while creating the user' });
    }
};
