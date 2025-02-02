import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addContact = async (req, res) => {
    try {
        const { title, name, phone, email, address, description } = req.body;
        if (!title || !name || !phone || !email || !address || !description) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newContact = await prisma.contact.create({
            data: {
                title,
                name,
                phone: phone,
                email,
                address,
                description
            }
        });

        res.status(201).json({
            message: 'Contact successfully created',
            contact: newContact
        });
    } catch (error) {
        console.error('Error creating contact:', error);
        res.status(500).json({
            message: 'An error occurred while creating the contact.',
            error: error.message
        });
    }
};
