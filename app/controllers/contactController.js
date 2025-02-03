import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const addContact = async (req, res) => {
    try {
        const { title, name, phone, email, address, description } = req.body;
        const userId = req.user.userId;

        if (!title || !name || !phone || !email || !address || !description) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const newContact = await prisma.contact.create({
            data: {
                title,
                name,
                phone,
                email,
                address,
                description,
                users: {
                    connect: { id: userId },
                },
            },
        });

        res.status(201).json({
            message: 'Contact successfully created',
            contact: newContact,
        });
    } catch (error) {
        console.error('Error creating contact:', error);
        res.status(500).json({
            message: 'An error occurred while creating the contact.',
            error: error.message,
        });
    }
};
