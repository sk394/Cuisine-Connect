import prisma from "../DB/db.config.js";

export const fetchUsers = async (req, res) => {
    const users = await prisma.user.findMany();
    return res.json({status: 200, data: users});
}

export const getUserProfile = async (req, res) => {
    const {userId} = req.params;

    try{
        const user = await prisma.user.findUnique({
            where: { id : userId},
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                favoriteFood: true,
                foodPreferences: true,
                hometown: true,
                createdAt: true,
                updatedAt: true,
                recipes: {
                    orderBy:{
                        createdAt: 'desc'
                    },
                    select:{
                        id: true,
                        createdAt: true,
                        ratings: {
                            select:{
                                value: true,
                            }
                        }
                    }
                }
            },
        });

        if (!user){
            return res.status(404).send({message: `User with id ${userId} not found`});
        }

        // calculate streak
        // streak is the count of days the user has posted a recipe in consective days
        let streak = 0;
        let lastPostDate = null;
        const today = new Date().setHours(0,0,0,0);

        for(const recipe of user.recipes){
            const postDate = new Date(recipe.createdAt).setHours(0,0,0,0);
            if(lastPostDate === null || postDate === lastPostDate - 86400000){  // 86400000 is the number of milliseconds in a day
                streak++;
                lastPostDate = postDate;
            }else if(postDate < lastPostDate - 86400000){  // if the user has not posted a recipe in the last day
                break;
            }
        }

        if(lastPostDate !== today && lastPostDate !== today - 86400000){ // if the last post was not yesterday or today, reset streak
            streak = 0;
        }

        // calculate HowdyFoody score
        let totalRating = 0;
        let ratedRecipes = 0;
        for (const recipe of  user.recipes){
            if (recipe.ratings.length > 0){
                const avgRating = recipe.ratings.reduce(
                    (sum, rating) => sum + rating.value, 0
                ) / recipe.ratings.length;
                totalRating += avgRating;
                ratedRecipes++;
            }
        }

        const howdyFoody = ratedRecipes > 0 ? (totalRating / ratedRecipes * 10) * 100 : 0;
        const {recipes, ...userWithoutRecipes} = user; // we dont need to get all recipes in the response

        const userProfile = {
            ...userWithoutRecipes,
            streak,
            howdyFoody : Math.round(howdyFoody,2) / 100,
            totalPosts : user.recipes.length,
        };

        res.json({status: 200, data: userProfile});
    } catch(error){
        res.status(500).send({message: error.message || "Error occurred while retrieving user profile"});
    }
};

export const updateProfile = async (req, res) => {
    const {userId} = req.params;
    const {name, image, favoriteFood, foodPreferences, hometown} = req.body;

    try{
        const user = await prisma.user.update({
            where: {id: userId},
            data: {
                name, 
                image,
                favoriteFood,
                foodPreferences,
                hometown
            }
        });

        res.json({status: 201, data: user});

    }catch(error){
        res.status(500).send({message: error.message || "Error occurred while updating user profile"});
    }
}