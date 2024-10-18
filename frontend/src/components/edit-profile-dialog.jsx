"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "./ui/input";
import { updateProfileDetails } from "@/app/api/profile";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
const { useForm } = require("react-hook-form");
const { Button } = require("./ui/button");
const { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } = require("./ui/dialog");
const { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } = require("./ui/form");

const EditProfileDialog = ({ user }) => {
    const form = useForm({
        defaultValues:{
            name: user.name,
            image: user.image,
            favoriteFood: user.favoriteFood,
            foodPreferences: user.foodPreferences.join(','),
            hometown: user.hometown,
    }});
    const queryClient = useQueryClient();
    const {toast} = useToast();
    const [dialogOpen, setDialogOpen] = useState(false);
    const router = useRouter();

    const mutation = useMutation({
        mutationFn:(data) => updateProfileDetails(user.id, data),
        onSuccess: () =>{
            queryClient.invalidateQueries('userProfile');
            toast({
                title: 'Profile Updated',
                description: 'Your profile has been updated successfully',
            });
            router.refresh();
            setDialogOpen(false);
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: error.message,
                variant: "destructive",
            });
        }
    });

    const onSubmit = (data) => {
        mutation.mutate({
            ...data,
            foodPreferences: data?.foodPreferences?.split(',').map((item) => item.trim()),
        });
    }
    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary" className="bg-black/20 absolute -left-16 top-1/2 -translate-y-1/2">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Your Profile</DialogTitle>
                    <DialogDescription>
                        Use this form to edit your profile infornmation.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid flex-1 mt-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Foody" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Profile Picture</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Paste your image link" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="favoriteFood"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>What's your favorite food/dish?</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nepali Daal Bhaat" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="foodPreferences"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>What are your food preferences?</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Asian, Italian, Spicy, Veg..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="hometown"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Where are you from?</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nepal" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </DialogContent>
        </Dialog >
    );
};

export default EditProfileDialog;