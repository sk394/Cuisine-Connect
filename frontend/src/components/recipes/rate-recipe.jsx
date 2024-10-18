"use client";

import {  rateRecipe } from "@/app/api/rating";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

const RateRecipe = ({recipeId, initialRating}) => {
    const queryClient = useQueryClient();
    const {toast} = useToast();
    const {data: session} = useSession();
    
    const [userRating, setUserRating] = useState(initialRating);
    
    const mutation = useMutation({
        mutationFn: rateRecipe,
        onSuccess: () => {
            queryClient.invalidateQueries(['recipe', recipeId]);
            toast({
                title: 'Recipe Rated',
                description: 'Your rating has been submitted',
            });
        },
        onError: (data) => {
            console.log(data);
            toast({
                title: 'Error',
                description: error.message,
                status: 'error',
            });
            setUserRating(initialRating);
        },
    }

    )
    const handleRating = (rating) => {
        if(!session?.user){
            toast({
                title: 'Error',
                description: 'You must be logged in to rate a recipe',
            });
            return;
        }
        setUserRating(rating);
        mutation.mutate({
            value: Number(rating),
            recipeId: recipeId,
            userId: session?.user?.sub,
        })
    }

    return (
        <>
        <div className="flex items-center mb-2 space-x-6">
        {[...Array(10)].map((_, index) => (
            <Star
                key={index}
                className={`h-5 w-5 ${
                index < userRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                } cursor-pointer`}
                onClick={() => handleRating(index + 1)}
            />
        ))}
        </div>
        {mutation.isLoading && <p>Submitting Rating...</p>}
        {mutation.isError && <p>Error Submitting Rating</p>}
        </>
    )
};

export default RateRecipe;