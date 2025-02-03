import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getContacts = async (req, res) => {
    try {
        const userId = req.user.userId; // Ambil userId dari token (dari middleware verifyJWT)

        // Cari pengguna berdasarkan userId dan sertakan kontak yang terkait
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { contact: true }, // Mengambil kontak yang terkait dengan pengguna
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Mengembalikan daftar kontak yang dimiliki pengguna
        res.status(200).json({
            message: 'Contacts fetched successfully',
            contacts: user.contact, // Kontak yang terkait dengan pengguna
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({
            message: 'An error occurred while fetching contacts.',
            error: error.message,
        });
    }
};
