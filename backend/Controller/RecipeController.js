import prisma from "../DB/db.config.js";

export const fetchRecipes = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    if(page <= 0){
        page = 1;
    }

    if(limit <= 0 || limit > 100){
        limit = 10;
    }

    const skip = (page -1) * limit;
    const recipes = await prisma.recipe.findMany({
        skip: skip,
        take: limit,
        orderBy: {
            createdAt: 'desc'
        },
        where: {
            user: {
                role: 'ADMIN'
            }
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    role: true,
                    
                }
            },
        }
    });
    const totalRecipes = await prisma.recipe.count({
        where:{
            user:{
                role: 'ADMIN'
            }
        }
    });
    const totalPages = Math.ceil(totalRecipes / limit);

    return res.json({
        status: 200,
        data: recipes,
        meta:{
            totalPages,
            currentPage: page,
            limit: limit,
        }
    })
}

export const createRecipe = async (req, res) => {
    const { title, postStatus, ingredients, instructions,isVideo, imageName, userId } = req.body;

    const newRecipe = await prisma.recipe.create({
        data: {
            title,
            postStatus,
            ingredients,
            instructions,
            isVideo,
            imageName,
            userId
        }
    });
    return res.json({
        status: 200,
        data: newRecipe,
        msg: "Recipe created successfully"
    })
}

export const getRecipesForFeed = async(req, res) => {
    const {sort = 'desc'} = req.query;
    try{
        const recipes = await prisma.recipe.findMany({
            where: {
                user:{
                    role: 'USER'
                }
            },
            include: {
                user : {
                    select : {name: true}
                },
                ratings: true,
                comments: {
                    include: {
                        user:{
                            select: {
                                name: true
                            }
                        }
                    }
                }
            },
            orderBy:{
                createdAt: sort
            }
        });

        const recipesWithRatings = recipes.map(recipe => ({
            ...recipe,
            averageRating: recipe.ratings.length > 0 ?
                recipe.ratings.reduce((sum, rating) => sum + rating.value, 0) / recipe.ratings.length
                :
                null
        }));
        res.json(recipesWithRatings);
    } catch(error){
        res.status(500).json({error: 'Failed to fetch recipes'});
    }
}

// Get user;s recipe
export const getUserRecipes = async (req, res) => {
    const userId = req.params.userId;

    try{
        const userRecipes = await prisma.recipe.findMany({
            where: {userId},
            include: {
                ratings: true,
                comments: true
            }
        });
        res.json(userRecipes);
    } catch(error){
        res.status(500).json({error: 'Failed to fetch user recipes'});
    }
}

// search recipe by title
export const searchRecipe = async (req, res) => {
    const query = req.query.q;
    const recipes = await prisma.recipe.findMany({
        where: {
            title: {
                contains: query,
                mode: "insensitive"
            }
        }
    });
    return res.json({
        status: 200,
        data: recipes
    })
}

// fetch single recipe
export const fetchSingleRecipe = async (req, res) => {
    const id = req.params.id;
    const recipe = await prisma.recipe.findUnique({
        where: {
            id
        }
    });
    return res.json({
        status: 200,
        data: recipe
    })
}

// update recipe
export const updateRecipe = async (req, res) => {
    const {id, userId} = req.params;
    const { title, postStatus, ingredients, instructions, imageName } = req.body;

    const updatedRecipe = await prisma.recipe.updateMany({
        where: {
            id,
            userId
        },
        data: {
            title,
            postStatus,
            ingredients,
            instructions,
            imageName,
        }
    });

    if (updatedRecipe.count === 0){
        return res.status(404).json({error: 'Recipe not found'});
    }
    return res.json({
        status: 200,
        data: updatedRecipe,
        msg: "Recipe updated successfully"
    })
}

// delete recipe
export const deleteRecipe = async (req, res) => {
    const {id, userId} = req.params;

    const deletedRecipe = await prisma.recipe.deleteMany({
        where: {
            id,
            userId
        }
    });

    if (deletedRecipe.count === 0){
        return res.status(404).json({error: 'Recipe not found'});
    }

    return res.json({
        status: 200,
        msg: "Recipe deleted successfully"
    })
}