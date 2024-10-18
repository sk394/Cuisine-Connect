import prisma from "../DB/db.config.js";

export const setBookmark = async (req, res) => {
    const {userId, recipeId} = req.body;

    try{
        const bookmark = await prisma.bookmark.create({
            data: {
                userId,
                recipeId
            }
        });

        return res.json({
            status: 201,
            data: bookmark,
            msg: "This recipe has been bookmarked"
        })
    }catch(error){
        res.status(500).json({error: 'Failed to bookmark'});
    }
}

export const removeBookmark = async (req, res) => {
    const {userId, recipeId} = req.body;

    try{
        const bookmark = await prisma.bookmark.delete({
            where: {
                userId_recipeId: {
                    userId,
                    recipeId
                }
            } 
        });
        return res.status(200).json({
            status: 200,
            message: "Bookmark removed"
        });
    }catch(error){
        res.status(500).json({error: 'Failed to remove bookmark'});
    }
}

export const fetchUserBookmarks = async (req, res) => {
    const {userId} = req.params;

    const bookmarks = await prisma.bookmark.findMany({
        where:{userId},
        orderBy:{
            createdAt: 'desc'
        },
        include:{
            recipe: true,
        }
    });
    return res.status(200).json({
        status: 200,
        data: bookmarks
    });
};