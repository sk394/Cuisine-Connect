import { getAllRecipes } from "@/app/api/recipe";
import { Breadcrumbs } from "@/components/breadcrumbs";
import PageWrapper from "@/components/page-wrapper";
import ShowRecipes from "@/components/recipes/show-recipes";
import React from "react";

const RecipeGeneratorPage = async ({searchParams}) => {
    const breadcrumbItems = [
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'Recipe Generator', link: '/dashboard/recipe-generator' }
      ];
    const page = Number(searchParams.page) || 1;
    const limit = 10;
    const {data:recipes, meta} = await getAllRecipes(page, limit);
    console.log(meta);
    return (
       <PageWrapper>
        <div className="pl-20">
         <Breadcrumbs items={breadcrumbItems} />
             <ShowRecipes data={recipes} pagination={meta}/> 
        </div>     
       </PageWrapper>
    );
};

export default RecipeGeneratorPage;
