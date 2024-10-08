import axios from "axios";

const BASE_URL= "http://localhost:4000/api/recipes";

export const getAllRecipes = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
}

export const createRecipe = async (recipe) => {
    const response = await axios.post(BASE_URL, recipe);
    return response.data;
}

export const getRecipe = async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
}

export const updateRecipe = async (id, recipe) => {
    const response = await axios.put(`${BASE_URL}/${id}`, recipe);
    return response.data;
}

export const deleteRecipe = async (id) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
}

export const searchRecipes = async (query) => {
    const response = await axios.get(`${BASE_URL}/search?q=${query}`);
    return response.data;
}