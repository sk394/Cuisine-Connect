"use client";

import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRecipe } from '@/app/api/recipe';
import { Textarea } from '../ui/textarea';
import { useSession } from 'next-auth/react';

const CreateRecipeFormComponent = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm({});
  const {toast} = useToast();

  const {data: session} = useSession();

  // mutation (creation of recipe)
  const mutation = useMutation({
    mutationFn: createRecipe, 
    onSuccess: () =>{
        queryClient.invalidateQueries('recipes');
        toast({
            title: "Success",
            description: "Recipe created successfully",
        });
        reset();
    },
    onError: () => {
        toast({
            title: "Error",
            description: "Failed to create recipe",
            variant: "destructive",
        });
    },
  });
  

    const onSubmit = (data) => {
        mutation.mutate({
            ...data,
            ingredients: data.ingredients.split(',').map(item => item.trim()),
            userId: session?.user?.sub
        });
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input {...register("title")} placeholder="Recipe Title" required />
      <Input {...register("ingredients")} placeholder="Ingredients (comma-separated)" required />
      <Textarea {...register("instructions")} placeholder="Instructions" required />
      <Input {...register("imageName")} placeholder="Image Name" />
      <Button type="submit">Create Recipe</Button>
    </form>
  );
}
export default CreateRecipeFormComponent;