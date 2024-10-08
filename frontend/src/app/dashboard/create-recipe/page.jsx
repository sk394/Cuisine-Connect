import { Breadcrumbs } from "@/components/breadcrumbs";
import PageWrapper from "@/components/page-wrapper";
import CreateRecipeFormComponent from "@/components/recipes/create-recipe-form";
import React from "react";


const CreateRecipe = () => {
    const breadcrumbItems = [
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'Create Recipes', link: '/dashboard/create-recipe' }
      ];
      
    return (
       <PageWrapper>
        <div className="space-y-4">
            <Breadcrumbs items={breadcrumbItems} />
            <CreateRecipeFormComponent />
        </div>
       </PageWrapper>
    );
};

export default CreateRecipe;