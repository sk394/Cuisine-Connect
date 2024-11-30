'use server';

import { revalidatePath } from "next/cache";
import { addComment } from "./api/comment";
import { addBookmark, removeBookmark } from "./api/bookmark";

export default async function createComment(formData){
    const {recipeId, userId, content} = formData;
    try{
        const comment = await addComment(recipeId, {userId, content});
        revalidatePath("/");
        return comment;
    }catch(error){
        throw new Error('Failed to add comment');
    }
}
 
export async function addBookMarkAction(recipeId, userId){
  try {
    const bookmark = await addBookmark({recipeId: recipeId, userId: userId});
    revalidatePath("/recipe-generator");
    return bookmark;
  } catch (error) {
    throw new Error("Failed to add bookmark");
  }
}

export async function removeBookMarkAction(recipeId, userId){
  try {
    const bookmark = await removeBookmark({recipeId: recipeId, userId: userId});
    revalidatePath("/recipe-generator");
    return bookmark;
  } catch (error) {
    throw new Error("Failed to remove bookmark");
  }
}