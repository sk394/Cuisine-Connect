"use client";

import { rateRecipe } from "@/app/api/rating";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Star, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button"; 
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"; 

const RateRecipe = ({ post, isLiked }) => {
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsRatingModalOpen(true)}
        className="flex flex-col items-center gap-1"
      >
        <Star className={`h-8 w-8 ${isLiked ? "fill-yellow-500 text-red-500" : ""}`} />
        <span className="text-sm font-semibold">{post.averageRating}</span>
      </button>

      <RateRecipeModal 
        recipeId={post.id} 
        initialRating={post?.userRating} 
        isOpen={isRatingModalOpen} 
        onClose={() => setIsRatingModalOpen(false)} 
      />
    </>
  );
};

const RateRecipeModal = ({ recipeId, initialRating, isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: session } = useSession();
  
  const [userRating, setUserRating] = useState(initialRating);
  
  const mutation = useMutation({
    mutationFn: rateRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries(['recipe', recipeId]);
      toast({
        title: 'Recipe Rated',
        description: 'Your rating has been submitted',
      });
      onClose();
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
      });
      setUserRating(initialRating);
    },
  });

  const handleRating = (rating) => {
    if (!session?.user) {
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
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rate This Recipe</DialogTitle>
        
        </DialogHeader>
        
        <div className="flex justify-center items-center space-x-2 py-4">
          {[...Array(10)].map((_, index) => (
            <Star
              key={index}
              className={`h-8 w-8 ${
                index < userRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              } cursor-pointer hover:scale-110 transition-transform`}
              onClick={() => handleRating(index + 1)}
            />
          ))}
        </div>
        
        {mutation.isLoading && (
          <p className="text-center text-sm text-gray-500">Submitting Rating...</p>
        )}
        {mutation.isError && (
          <p className="text-center text-sm text-red-500">Error Submitting Rating</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RateRecipe;