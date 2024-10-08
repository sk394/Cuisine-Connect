import { getAllRecipes } from "@/app/api/recipe";
import { Breadcrumbs } from "@/components/breadcrumbs";
import PageWrapper from "@/components/page-wrapper";
import ShowRecipes from "@/components/recipes/show-recipes";
import React from "react";

const RecipeGeneratorPage = async () => {
    const breadcrumbItems = [
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'Recipe Generator', link: '/dashboard/recipe-generator' }
      ];
    const recipes = await getAllRecipes();
    return (
       <PageWrapper>
         <Breadcrumbs items={breadcrumbItems} />
             <ShowRecipes data={recipes?.data} />      
       </PageWrapper>
    );
};

export default RecipeGeneratorPage;
