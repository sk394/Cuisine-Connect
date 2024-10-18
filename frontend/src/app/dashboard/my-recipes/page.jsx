import { getUserPostedRecipes } from "@/app/api/recipe";
import { authOptions } from "@/app/libs/auth";
import { Breadcrumbs } from "@/components/breadcrumbs";
import PageWrapper from "@/components/page-wrapper";
import { getServerSession } from "next-auth";
import React from "react";
import MyRecipesTable from "@/components/my-recipe-table";


const MyRecipes = async () => {
    const breadcrumbItems = [
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'My Recipes', link: '/dashboard/my-recipes' }
    ];

    const session = await getServerSession(authOptions);
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        };
    }

    const userRecipes = await getUserPostedRecipes(session?.user?.sub);
      
    return (
       <PageWrapper>
        <div className="space-y-4 pl-20">
            <Breadcrumbs items={breadcrumbItems} />
            <MyRecipesTable recipes={userRecipes} />
        </div>
       </PageWrapper>
    );
};

export default MyRecipes;