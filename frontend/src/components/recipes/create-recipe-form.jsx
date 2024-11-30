"use client";

import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRecipe } from '@/app/api/recipe';
import { Textarea } from '../ui/textarea';
import { useSession } from 'next-auth/react';
import { UploadButton } from '@/utils/uploadthing';
import { useState } from 'react';
import { Checkbox } from '../ui/checkbox';

const CreateRecipeFormComponent = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm({});
  const [imageUrl, setImageUrl] = useState("");
  const [showVideoUploadButton, setShowVideoUploadButton] = useState(false);
  const { toast } = useToast();

  const { data: session } = useSession();

  // mutation (creation of recipe)
  const mutation = useMutation({
    mutationFn: createRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries('recipes');
      toast({
        title: "Success",
        description: "Recipe created successfully",
      });
      reset();
      setImageUrl("");
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
      imageName: imageUrl,
      isVideo: showVideoUploadButton,
      userId: session?.user?.sub
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input {...register("title")} placeholder="Recipe Title" required />
      <Input {...register("ingredients")} placeholder="Ingredients (comma-separated)" required />
      <Textarea {...register("instructions")} placeholder="Instructions" required />
      <div className="flex items-center space-x-2">
      <Checkbox
          {...register("isVideo")}
          id="isVideo"
          checked={showVideoUploadButton}
          onCheckedChange={(checked) => {
            setShowVideoUploadButton(checked);
          }}
        />
        <label
        htmlFor="isVideo"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Upload Video
      </label>
      </div>
      <div className="items-start justify-items-start flex flex-row">
       {showVideoUploadButton ? ( 
        <UploadButton
          endpoint="videoUploader"
          className="text-white font-bold py-2 rounded"
          onClientUploadComplete={(res) => {
            setImageUrl(res[0].url);
          }}
          onUploadError={(error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />): (
        <UploadButton
          endpoint="imageUploader"
          className="text-white font-bold py-2 rounded"
          onClientUploadComplete={(res) => {
            setImageUrl(res[0].url);
          }}
          onUploadError={(error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />)}

        {imageUrl.length ? (
          <div className="ml-6">
           {!showVideoUploadButton ? <img src={imageUrl} alt="Uploaded Image" className=" h-20 w-20" />
           : <span className="ml-6">{"Video uploaded successfully"}</span>}
          </div>
        ) : null}
      </div>
      <Button type="submit">Create Recipe</Button>
    </form>
  );
};
export default CreateRecipeFormComponent;