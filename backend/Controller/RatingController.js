import prisma from "../DB/db.config.js";

export const rateRecipe = async (req, res) => {
    const {recipeId} = req.params;
    const {userId, value} = req.body;

    try{
        const rating = await prisma.rating.upsert({
            where: {
                userId_recipeId: {
                    userId,
                    recipeId
                }
            },
            update: {value},
            create:{
                userId,
                recipeId,
                value
            }
        });
        res.json(rating);
    } catch(error){
        res.status(400).json({error:'Failed to create a rating'})
    }
}

export const getRecipeRatingByUserId = async (req, res) => {
    const {recipeId, userId} = req.params;

    try{
        const rating = await prisma.rating.findUnique({
            where: {
                userId_recipeId: {
                    recipeId,
                    userId
                }
            }
        });
        res.json(rating);
    } catch(error){
        res.status(400).json({error:'Failed to get rating'})
    }
}