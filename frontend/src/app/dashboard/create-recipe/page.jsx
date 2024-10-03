import { Breadcrumbs } from "@/components/breadcrumbs";
import PageWrapper from "@/components/page-wrapper";
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
            <h1>Create Recipe Section</h1>
        </div>
       </PageWrapper>
    );
};

export default CreateRecipe;