import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (req, res) => {
    const { username, password } = req.body;
    const token = req.token;

    try {
        // Memastikan username dan password ada di request body
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        // Membuat user baru menggunakan Prisma
        const newUser = await prisma.user.create({
            data: {
                username,
                password,
            },
        });

        // Mengembalikan respons sukses dengan token
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

        // Menangani error lainnya yang mungkin muncul
        console.error(error);
        res.status(500).json({ error: 'Something went wrong while creating the user' });
    }
};
