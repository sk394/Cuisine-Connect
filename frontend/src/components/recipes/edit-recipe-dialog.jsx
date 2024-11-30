"use client";

import {  updateRecipe } from "@/app/api/recipe";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";

export function EditRecipeSheet({setOpen, recipe}) {
    const queryClient = useQueryClient();
    const {toast} = useToast();
    const router = useRouter();
    const {data: session} = useSession();

    const { register, handleSubmit } = useForm({
        defaultValues: {
          title: recipe?.title,
          ingredients: recipe?.ingredients.map(ingredient => ingredient).join(', '),
          instructions: recipe.instructions,
          imageName: recipe?.imageName,
        },
    });

    const editMutation = useMutation({
        mutationFn: (recipe) => updateRecipe(recipe),
        onSuccess: (data) => {
          queryClient.invalidateQueries('recipes');
          toast({
            title: 'Recipe updated successfully.',
          });
          router.refresh(); 
        },
        onError: (error) => {
          toast({
            title: 'Failed to update.',
            description: error.message,
            variant: "destructive",
          });
        },
      });

      const handleEdit = () => {
        editMutation.mutate({
        recipeId: recipe.id,
        userId: session?.user?.sub
        });
    }
return (
    <Sheet open={open} onOpenChange={() => setOpen()}>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Edit this Recipe</SheetTitle>
                <SheetDescription>
                    Make changes to your recipe. Click save when you're done.
                </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
            <form onSubmit={handleSubmit(handleEdit)} className="space-y-4">
                <div className="mt-4 mb-2"><Label htmlFor="title">Recipe Title</Label>
                <Input {...register("title")} placeholder="Recipe Title" id="title" required />
                </div>
                <div className="mt-4 mb-2">
                <Label htmlFor="ingredients">Ingredients (comma-separated)</Label>
                <Input {...register("ingredients")} placeholder="Ingredients (comma-separated)" id="ingredients" required />
                </div>
                <div className="mt-4 mb-2">
                <Label htmlFor="instructions">Instructions</Label>
                <Textarea {...register("instructions")} placeholder="Instructions" id="instructions" required />
                </div>
                <div className="mt-4 mb-2">
                <Label htmlFor="imageName">Image Name</Label>
                <Input {...register("imageName")} placeholder="Image Name" id="imageName" />
                </div>
            </form>
            </div>
            <SheetFooter>
                <SheetClose asChild>
                    <Button type="submit">Save changes</Button>
                </SheetClose>
            </SheetFooter>
        </SheetContent>
    </Sheet>
)
}
