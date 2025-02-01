import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (req, res) =>{
    const {username} = req.body;
    const token = req.token;
    const password = req.password;

    try{
        const newUser = await prisma.user.create({
            data: {
                username,
                password
            }
        });
        res.status(201).json({
            message: 'Success',
            user: newUser,
            token: token
        });
    }catch(error)
    {
        console.log(error);
        res.status(500).json({error: 'Something went wrong'});
    }
}