"use client";

import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRecipe } from '@/app/api/recipe';
import { Textarea } from '../ui/textarea';

const CreateRecipeFormComponent = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm({});
  const {toast} = useToast();

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
  

//   const onSubmit = async (data) => {
//     try {
//       const response = await fetch('http://localhost:4000/api/recipes', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...data,
//           ingredients: data.ingredients.split(',').map(item => item.trim()),
//         }),
//       });
//       if (!response.ok) throw new Error('Failed to create recipe');
//       toast({
//         title: "Success",
//         description: "Recipe created successfully",
//       });
//       reset();
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to create recipe",
//         variant: "destructive",
//       });
//     }
//   };

    const onSubmit = (data) => {
        mutation.mutate({
            ...data,
            ingredients: data.ingredients.split(',').map(item => item.trim()),
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