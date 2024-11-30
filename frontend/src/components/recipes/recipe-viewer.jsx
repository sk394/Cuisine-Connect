'use client'

import React, { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card";
import { Monitor, MessageCircle, Bookmark, ChevronRight,  X } from 'lucide-react'
import { cn } from "@/lib/utils"
import { useSidebar } from '@/hooks/use-sidebar';
import AddRecipePost from './create-a-post';
import RateRecipe from './rate-recipe';
import AddComment from './add-comment';
import ShareButton from '../share-button';
import { addBookMarkAction } from '@/app/actions';
import { useSession } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { getProfileDetails } from '@/app/api/profile';

const RecipePostViewer = ({ post, isVisible }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isSaved, setIsSaved] = useState(false);
  const {isMinimized, toggle} = useSidebar();
  const {toast} = useToast();
  const {data: session} = useSession();
  const [showComments, setShowComments] = useState(false)
  const { ref } = useInView({
    threshold: 0.5,
  });

  const {data: user} = useQuery({
    queryKey: ['user', post.userId],
    queryFn: async () => getProfileDetails(post.userId),
   });

  const slides = [
    { type: post.isVideo ? 'video': 'image', content: post.imageName },
    { type: 'ingredients', content: post.ingredients },
    { type: 'instructions', content: post.instructions },
  ]

  const renderSlide = () => {
    const slide = slides[currentSlide]
    switch (slide.type) {
      case 'image':
        return <img src={slide.content} alt="Recipe" className="w-full h-full object-contain" />
      case 'video':
        return <video src={slide.content} className="w-full h-full object-cover" autoPlay loop />
      case 'ingredients':
        return (
          <div className="bg-black bg-opacity-50 text-white p-4 h-full w-full flex items-center justify-center">
            <div className="max-w-md">
              <h3 className="font-semibold text-2xl mb-2">Ingredients</h3>
              <ul className="list-disc pl-5">
                {slide.content.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </div>
        )
      case 'instructions':
        return (
          <div className="bg-black bg-opacity-50 text-white p-4 h-full w-full flex items-center justify-center">
            <div className="max-w-md">
              <h3 className="font-semibold text-2xl mb-2">Instructions</h3>
              <p>{slide.content}</p>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card ref={ref} className="relative h-screen w-full max-w-md mx-auto overflow-hidden bg-gradient-to-br from-purple-900 to-purple-600">
      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 flex items-center justify-between text-white">
         <button
            onClick={toggle}
            aria-label="Toggle Sidebar"
            title="Toggle Sidebar"
            >
          <Monitor className = {`transition-transform ${isMinimized ? "rotate-180" : ""}`} />
          </button>
        <div className="flex gap-4 text-lg font-semibold">
          <span className="opacity-70">Feed</span>
          <span className="relative">
            Food Reels
            <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white rounded-full" />
          </span>
        </div>
           <AddRecipePost />        
      </div>

      {/* Main Content */}
      <div className="relative h-full w-full">
        {renderSlide()}

        {/* Right Sidebar */}
        <div className="absolute right-4 bottom-20 flex flex-col items-center gap-6 text-white">
          <div className="relative flex flex-col items-center">
            <Avatar className="h-12 w-12 border-2 border-white">
              <AvatarImage src={post.user.image} alt={post.user.name} />
              <AvatarFallback className="bg-purple-500 text-white">{post.user.name[0]}</AvatarFallback>
            </Avatar>
            <span class="top-0 left-7 absolute  w-6 h-6 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full text-sm"><span className="ml-1 mr-1 pl-0.5 text-clip font-bold text-yellow-100 cursor-pointer" title="Streak">{user?.data?.streak}</span></span>
          </div>
          <RateRecipe post={post} isLiked ={post.userRating === 0 ? false : true} />
          <button className="flex flex-col items-center gap-1"
             onClick={() => setShowComments(!showComments)}
             >
            <MessageCircle className="h-8 w-8" />
            <span className="text-sm font-semibold">{post.comments.length}</span>
          </button>

          <button 
            onClick={async () => {
              try{
                await addBookMarkAction(post?.id, session?.user?.sub);
                setIsSaved(!isSaved)
              }
              catch(error)
              {
                console.error(error);
              }
              finally
              {
                toast({
                  title: 'This recipe is saved successfully.',
                });
              }
            }}
            className="flex flex-col items-center gap-1"
          >
            <Bookmark className={cn("h-8 w-8", isSaved && "fill-red-600")} />
          </button>
          <ShareButton />
          
        </div>

        {/* Bottom Text Overlay */}
        <div className="absolute bottom-4 left-4 right-16 text-white">
          <h2 className="text-lg font-semibold mb-2">@{post.user.name}</h2>
          <p className="text-sm">
            {post.postStatus}
          </p>
          
        </div>

        {/* Slide Indicator */}
        <div className="absolute top-1/4 left-0 transform -translate-y-1/2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-pink-500 bg-blue-200"
            onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>
      {/* Comments Section */}
      <div 
          className={cn(
            "absolute top-10 right-0 mt-5 bottom-0 w-80 rounded-lg bg-gray-500 transition-transform duration-300 ease-in-out transform",
            showComments ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-semibold">Comments</h3>
            <Button variant="ghost" size="icon" onClick={() => setShowComments(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="overflow-y-auto h-[calc(100%-8rem)]">
            {post.comments.map((comment) => (
              <div key={comment.id} className="p-4 border-b">
                <div className="flex items-center mb-2">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={comment.user.image} alt={comment.user.name} />
                    <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-semibold">{comment.user.name}</span>
                </div>
                <p className="text-sm">{comment.content}</p>
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4  border-t">
            <div className="flex">
              <AddComment recipeId={post.id} />    
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
};

export default RecipePostViewer;