"use client";
import { Heart, HeartOff, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchRecipes } from '@/app/api/recipe';
import SkeletonLoader from '@/app/skeleton';
import PaginationComponent from '../pagination-recipes';
import { Separator } from '../ui/separator';
import { addBookMarkAction, removeBookMarkAction } from '@/app/actions';
import { useEffect } from 'react';


const ShowRecipes = ({ data, pagination, bookmarks, userId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const { data: recipes, isLoading, isError, error } = useQuery({
    queryKey: ['recipes', searchTerm],
    queryFn: async () => await searchRecipes(searchTerm),
    enabled: searchTerm.length > 0,
  }
  );

  const [lovedRecipes, setLovedRecipes] = useState([]);
  useEffect(() => {
    const loved = data.filter(recipe => bookmarks.some(bookmark => bookmark.recipeId === recipe.id)).map(recipe => recipe.id);
    setLovedRecipes(loved);
  }, [data, bookmarks]);

  const toggleLoved = (recipeid) => {
    setLovedRecipes((prev) =>
      prev.includes(recipeid) ? prev.filter((id) => id !== recipeid) : [...prev, recipeid]
    );
  };

  const allRecipes = searchTerm.length > 0 ? recipes?.data : data;

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex items-center space-x-2">
        <Search className="w-5 h-5 text-gray-500" />
        <Input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Recipes</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-200px)]">
              {isLoading && <SkeletonLoader />}
              {isError && <p>{error.message}</p>}
              {allRecipes?.map(recipe => (
                <Button
                  key={recipe.id}
                  variant="ghost"
                  className="w-full justify-start text-left mb-2"
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  {recipe.title}
                  {lovedRecipes.includes(recipe.id) && (
                    <Heart className="ml-2 h-4 w-4 text-red-500" />
                  )}
                </Button>
              ))}
            </ScrollArea>
            <Separator className="mb-3" />
            <div className="flex flex-col flex-wrap overflow-hidden justify-center mt-0">
              <PaginationComponent currentPage={pagination.currentPage} totalPages={pagination.totalPages} baseUrl="/dashboard/recipe-generator" />
              {bookmarks.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-bold mb-2">Bookmarked Recipes</h3>
                  <ScrollArea className="h-[calc(100vh-200px)]">
                    {bookmarks.map((bookmark) => (
                      <Button
                        key={bookmark.id}
                        variant="ghost"
                        className="w-full justify-start text-left mb-2"
                        onClick={() => setSelectedRecipe(bookmark?.recipe)}
                      >
                        {bookmark?.recipe?.title}
                        <Heart className="ml-2 h-4 w-4 text-red-500" />
                      </Button>
                    ))}
                  </ScrollArea>
                </div>
              )}

            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-1 justify-between items-center">
            <div><CardTitle>{selectedRecipe ? selectedRecipe.title : 'Select a Recipe'}</CardTitle></div>
            {selectedRecipe && (
              <>
                {lovedRecipes.includes(selectedRecipe.id) ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={async () => {
                      await removeBookMarkAction(selectedRecipe?.id, userId);
                      toggleLoved(selectedRecipe.id);
                    }}>
                    <Heart className="h-6 w-6 text-red-500" />
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={async () => {
                      await addBookMarkAction(selectedRecipe?.id, userId);
                      toggleLoved(selectedRecipe.id);
                    }}>
                    <HeartOff className="h-6 w-6 text-gray-500" /></Button>
                )}
              </>
            )}

          </CardHeader>
          <CardContent>
            {selectedRecipe ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold">Ingredients:</h3>
                  <ul className="list-disc list-inside">
                    {selectedRecipe?.ingredients?.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold">Instructions:</h3>
                  <p>{selectedRecipe.instructions}</p>
                </div>
                <div className="flex flex-col items-center">
                  {selectedRecipe?.isVideo ? 
                    <video src={selectedRecipe.imageName} className="h-48 w-96 object-fit" controls /> 
                    : 
                    <img src={selectedRecipe?.imageName} alt={selectedRecipe.imageName} className="w-full h-auto object-cover rounded-lg  px-2" />}
                  <caption className="text-xs text-muted-foreground py-1 italic">{selectedRecipe.title}</caption>
                </div>
              </div>
            ) : (
              <p>Click on a recipe to view details</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShowRecipes;