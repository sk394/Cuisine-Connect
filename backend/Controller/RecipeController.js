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
    });
    const totalRecipes = await prisma.recipe.count();
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
    const { title, ingredients, instructions, imageName } = req.body;
    const newRecipe = await prisma.recipe.create({
        data: {
            title,
            ingredients,
            instructions,
            imageName,
        }
    });
    return res.json({
        status: 200,
        data: newRecipe,
        msg: "Recipe created successfully"
    })
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
    const id = String(req.params.id);
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
    const id = String(req.params.id);
    const { title, ingredients, instructions, imageName } = req.body;
    const updatedRecipe = await prisma.recipe.update({
        where: {
            id
        },
        data: {
            title,
            ingredients,
            instructions,
            imageName,
        }
    });
    return res.json({
        status: 200,
        data: updatedRecipe,
        msg: "Recipe updated successfully"
    })
}

// delete recipe
export const deleteRecipe = async (req, res) => {
    const id = String(req.params.id);
    await prisma.recipe.delete({
        where: {
            id
        }
    });
    return res.json({
        status: 200,
        msg: "Recipe deleted successfully"
    })
}