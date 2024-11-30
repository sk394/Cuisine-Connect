"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRecipe } from "@/app/api/recipe";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/utils/uploadthing";
import { Checkbox } from "../ui/checkbox";

const AddRecipePost = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [showVideoUploadButton, setShowVideoUploadButton] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const form = useForm({});
    const queryClient = useQueryClient();
    const router = useRouter();
    const { data: session } = useSession();

    const steps = [
        { title: 'postStatus', field: 'postStatus' },
        { title: 'title', field: 'title' },
        { title: 'ingredients', field: 'ingredients' },
        { title: 'instructions', field: 'instructions' },
        { title: 'imageName', field: 'imageName' },
    ];

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const { toast } = useToast();

    // mutation (creation of recipe)
    const mutation = useMutation({
        mutationFn: createRecipe,
        onSuccess: (data) => {
            queryClient.invalidateQueries('recipes');
            toast({
                title: "Success",
                description: "Recipe posted successfully",
            });
            router.refresh();
            setIsDialogOpen(false);
            form.reset();;
        },
        onError: (data) => {
            toast({
                title: "Error",
                description: "Failed to create recipe",
                variant: "destructive",
            });
        },
    });

    const handleSubmit = async (data) => {    
        await mutation.mutate({
            ...data,
            ingredients: data?.ingredients?.split(',').map(item => item.trim()),
            imageName: imageUrl,
            userId: String(session?.user?.sub),
        });
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) setCurrentStep(0);
        }}>
            <DialogTrigger asChild>
                <Button size="icon" variant="ghost" className="rounded-full bg-red-500 h-6 w-6 -mt-3">
                    <Plus className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a new Post</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Form {...form}>
                        <div className="space-y-2">
                            {steps[currentStep].field === 'postStatus' && (
                                <FormField
                                    control={form.control}
                                    name="postStatus"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="You must try this recipe👌!!" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            )}
                            {steps[currentStep].field === 'title' && (
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Recipe Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Chicken Tikka Masala" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            )}
                            {steps[currentStep].field === 'ingredients' && (
                                <FormField
                                    control={form.control}
                                    name="ingredients"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Ingredients</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Enter ingredients in comma-separated(,)" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            )}
                            {steps[currentStep].field === 'instructions' && (
                                <FormField
                                    control={form.control}
                                    name="instructions"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Instructions</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="You should cut your chicken into medium sized pieces..." {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            )}
                            {steps[currentStep].field === 'imageName' && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="isVideo"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Is Video</FormLabel>
                                                <FormControl>
                                                    <div className="flex items-center space-x-2">
                                                        <Checkbox
                                                            {...field}
                                                            checked = {field.value}
                                                            onCheckedChange={(checked) => {
                                                                field.onChange(!!checked);
                                                                setShowVideoUploadButton(checked);
                                                            }}
                                                        />

                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="imageName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Image Name</FormLabel>
                                                <FormControl>
                                                    <div className="flex flex-row place-items-center justify-center">
                                                        {showVideoUploadButton ?
                                                            <UploadDropzone
                                                                {...field}
                                                                endpoint="videoUploader"
                                                                className="text-white font-bold py-2 rounded"
                                                                onClientUploadComplete={(res) => {
                                                                    setImageUrl(res[0].url);
                                                                }}
                                                                onUploadError={(error) => {
                                                                    alert(`ERROR! ${error.message}`);
                                                                }}
                                                            />
                                                            : <UploadDropzone
                                                                {...field}
                                                                endpoint="imageUploader"
                                                                className="text-white font-bold py-2 rounded"
                                                                onClientUploadComplete={(res) => {
                                                                    setImageUrl(res[0].url);
                                                                }}
                                                                onUploadError={(error) => {
                                                                    alert(`ERROR! ${error.message}`);
                                                                }}
                                                            />
                                                        }
                                                        {imageUrl.length ? (
                                                            <span>{!showVideoUploadButton ? <img src={imageUrl} alt="Uploaded Image" className="object-cover h-full w-full" /> : <pre>{"Video uploaded successfully"}</pre>}</span>
                                                        ) : null}
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )}
                            <div className="flex justify-between mt-3 py-2">
                                <Button type="button" onClick={handlePrevious} disabled={currentStep === 0}>
                                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                                </Button>
                                {currentStep === steps.length - 1 ? (
                                    <Button variant="outline" type="button" className="w-full ml-3 px-2"
                                        onClick={form.handleSubmit(handleSubmit)}
                                    >
                                        Post
                                    </Button>
                                ) : (
                                    <Button type="button" onClick={handleNext}>
                                        Next
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>

    );
};

export default AddRecipePost;