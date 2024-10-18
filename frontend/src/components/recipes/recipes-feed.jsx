"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MessageCircle, Star } from "lucide-react";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import AddRecipePost from "./create-a-post";
import RateRecipe from "./rate-recipe";
import AddComment from "./add-comment";


const RecipesFeed = ({ recipePosts }) => {
    const [newComment, setNewComment] = useState('')
    const [visibleComments, setVisibleComments] = useState({});

    const toggleComments = (postId) => {
      setVisibleComments(prev => ({
        ...prev,
        [postId]: !prev[postId]
      }));
    };
    const { register, handleSubmit, reset } = useForm({});

    const handleAddComment = () => {
        if (newComment.trim()) {
          post.comments.push({ user: 'Current User', text: newComment })
          setNewComment('')
        }
      }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <AddRecipePost  />
            {recipePosts.map((post) => (
                <Card key={post.id} className="mb-6 ">
                    <CardHeader>
                        <div className="flex flex-row justify-between">
                        <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-2">
                                <AvatarImage src={post.user.name} alt ={post.user.name} />
                                <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                            </Avatar>
                          
                            <div>
                                <h2 className="text-lg font-semibold">{post.user.name}</h2>
                                <p className="text-sm text-muted-foreground">{post.postStatus}</p>
                            </div>
                            
                        </div>
                        <div className="float-right mt-0">
                            <pre>{`${new Date(post.createdAt).toLocaleString("en-US")}`}</pre>
                        </div>

                        </div>
                    </CardHeader>
                    <CardContent>
                        <Carousel>
                            <CarouselContent>
                                <CarouselItem><img src={post?.imageName} alt={post.imageName} className="w-full h-auto object-cover rounded-lg  px-2" /></CarouselItem>
                                <CarouselItem>
                                     <div className="relative">
                                        <img src="/food.jpg" alt={post.imageName} className="w-full h-auto object-cover rounded-lg px-2 opacity-15" />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50 rounded-lg">
                                            <h3 className="font-semibold text-2xl mb-2">Ingredients</h3>
                                            <ul className="list-disc pl-5 mb-4">
                                                {post.ingredients.map((ingredient, index) => (
                                                    <li key={index}>{ingredient}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </CarouselItem>
                                <CarouselItem>
                                <div className="relative">
                                        <img src="/food.jpg" alt={post.imageName} className="w-full h-auto object-cover rounded-lg px-2 opacity-15" />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50 rounded-lg">
                                            <h3 className="font-semibold text-2xl mb-2">Instructions</h3>
                                            <pre>{post?.instructions}</pre>
                                        </div>
                                    </div>
                                </CarouselItem>
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                        

                    </CardContent>
                    <CardFooter className="flex flex-col items-center">
                        <p className="text-sm text-muted-foreground mb-2">
                            Average Rating: {post.averageRating} / 10
                        </p>
                        <RateRecipe recipeId={post.id} initialRating={post?.userRating} />
                        <Button className="my-2 w-full" variant="outline" onClick={() => toggleComments(post.id)}>
                            <MessageCircle className="mr-2 h-4 w-4" />
                            {visibleComments[post.id] ? 'Hide Comments' : `${post.comments.length} comments`}
                        </Button>
                        {visibleComments[post.id] && (
                            <AddComment recipeId={post.id} />
                        )}
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
};

export default RecipesFeed;