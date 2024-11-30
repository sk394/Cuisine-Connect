"use client";

import { addComment, getAllCommentsByRecipeId } from "@/app/api/comment";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { SubmitButton } from "../submit-button";
import { useSession } from "next-auth/react";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";

const AddComment = ({recipeId}) =>{
    const form = useForm({});
    const queryClient = useQueryClient();
    const {toast} = useToast();
    const {data: session} = useSession();

    const {data: comments} = useQuery({
        queryKey: ['comments', recipeId],
        queryFn: () => getAllCommentsByRecipeId(recipeId),
        enabled: !!recipeId,
    });

    const mutation =  useMutation({
        mutationFn: (commentData) => addComment(commentData),
        onSuccess: (data) => {
          queryClient.invalidateQueries(['comments', recipeId]);
          toast({
            title: 'Comment added successfully.',
          });
          // Optionally, update the comments list immediately
          queryClient.setQueryData(['comments', recipeId], (oldData) => {
            return oldData ? [...oldData, data] : [data];
          });
        },
        onError: (error) => {
          toast({
            title: 'Failed to add comment.',
            description: error.message,
            variant: "destructive",
          });
        },
      });
   
    const onSubmit = (formData) => {
       mutation.mutate({
            recipeId,
            userId: session?.user?.sub,
            content: formData.content,
        });
        form.reset();
    };

    return (
        <div className="w-full flex mb-4">
            <Form {...form}>
            <form className="w-full flex items-center" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="content"
                    render={({field}) => (
                             <FormItem>
                                <FormLabel>{""}</FormLabel>
                                <FormControl>
                                    <Input className="flex-grow  bg-white text-black" placeholder="Add your comment..." {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                />
                <SubmitButton message="Post" className="ml-6 mt-2" />
            </form>
            </Form>
        </div>
    
    );
}

export default AddComment;