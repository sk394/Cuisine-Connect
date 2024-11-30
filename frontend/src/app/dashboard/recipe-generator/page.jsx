import { fetchUserBookmarks } from "@/app/api/bookmark";
import { getProfileDetails } from "@/app/api/profile";
import { getAllRecipes } from "@/app/api/recipe";
import { authOptions } from "@/app/libs/auth";
import { Breadcrumbs } from "@/components/breadcrumbs";
import PageWrapper from "@/components/page-wrapper";
import ShowRecipes from "@/components/recipes/show-recipes";
import { getServerSession } from "next-auth";
import React from "react";
import { SmoothScrollProvider } from "../../../../providers/smooth-scroll-provider";

const RecipeGeneratorPage = async ({searchParams}) => {
    const breadcrumbItems = [
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'Recipe Generator', link: '/dashboard/recipe-generator' }
      ];
    const page = Number(searchParams.page) || 1;
    const limit = 10;
    const {data:recipes, meta} = await getAllRecipes(page, limit);
    const session = await getServerSession(authOptions);

    const {data: bookmarkRecipes} = await fetchUserBookmarks(session?.user?.sub);

    return (
      <SmoothScrollProvider>
       <PageWrapper>
        <div className="pl-20">
         <Breadcrumbs items={breadcrumbItems} />
             <ShowRecipes data={recipes} pagination={meta} bookmarks={bookmarkRecipes} userId = {session?.user?.sub}/> 
        </div>     
       </PageWrapper>
       </SmoothScrollProvider>
    );
};

export default RecipeGeneratorPage;
