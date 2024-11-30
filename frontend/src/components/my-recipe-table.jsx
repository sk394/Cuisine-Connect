"use client";

import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Pencil, Trash2 } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { deleteRecipe, updateRecipe } from "@/app/api/recipe";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { EditRecipeSheet } from "./recipes/edit-recipe-dialog";

const MyRecipesTable = ({recipes}) => {
    const queryClient = useQueryClient();
    const {data: session} = useSession();
    const router = useRouter();
    const {toast} = useToast();
    const [open, setOpen] = useState(false);
    const [recipe_id, setRecipeToEdit] = useState(null);

    

    const deleteMutation = useMutation({
        mutationFn: deleteRecipe,
        onSuccess: (data) => {
          queryClient.invalidateQueries('recipes');
          toast({
            title: 'Recipe deleted successfully.',
          });
          router.refresh(); 
        },
        onError: (error) => {
          toast({
            title: 'Failed to delete.',
            description: error.message,
            variant: "destructive",
          });
        },
    });

    

    const handleDelete = (id) => {
        deleteMutation.mutate({
            id: id, 
            userId: session?.user?.sub
        });
    }
console.log(recipes);
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center justify-between">My Recipes</h1>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Posted Date</TableHead>
              <TableHead>Comments #</TableHead>
              <TableHead>Likes #</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recipes.map((recipe) => (
              <TableRow key={recipe.id}>
                <TableCell>
                  {recipe?.isVideo ? <pre>{"Video"}</pre> :<img src={recipe?.imageName} alt={recipe.imageName} className="w-20 h-auto object-cover rounded-lg  px-2" />}
                </TableCell>
                <TableCell className="font-medium">{recipe.title}</TableCell>
                <TableCell>{recipe.createdAt}</TableCell>
                <TableCell>{recipe.comments.length}</TableCell>
                <TableCell>{recipe.ratings.length}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setRecipeToEdit(recipe);
                      setOpen(true);
                    }}
                    className="mr-2"
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(recipe.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {open && <EditRecipeSheet setOpen={setOpen} recipe = {recipe_id} />}
      </div>
    </div>
  )
}

export default MyRecipesTable;