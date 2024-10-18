import prisma from "../DB/db.config.js";

export const addComment = async (req, res) => {
    const {recipeId} = req.params;
    const {userId, content} = req.body;

    try{
        const comment = await prisma.comment.create({
            data: {
                content,
                userId,
                recipeId
            }
        });

        return res.json({
            status: 200,
            data: comment,
            msg: "Comment added successfully"
        })
    }catch(error){
        res.status(400).json({error: 'Failed to add comment'});
    }
}

export const getAllCommentsByRecipeId = async (req, res) => {
    const {recipeId} = req.params;

    try{
        const comments = await prisma.comment.findMany({
            where: {
                recipeId
            },
            include: {
                user: true
            },
            orderBy: {
                createdAt: 'desc'
            },
        });

        res.status(200).json(comments);
    }catch(error){
        res.status(400).json({error: 'Failed to fetch comments'});
    }
}