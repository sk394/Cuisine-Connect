import prisma from "../DB/db.config.js";

export const fetchUsers = async (req, res) => {
    const users = await prisma.user.findMany();
    return res.json({status: 200, data: users});
}