'use server';

import { revalidatePath } from "next/cache";
import { addComment } from "./api/comment";

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