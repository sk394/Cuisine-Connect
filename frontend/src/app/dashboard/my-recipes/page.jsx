import PageWrapper from "@/components/page-wrapper";
import React from "react";


const MyRecipes = async () => {
    // const recipes = await fetch('/api/recipes/{user_id}');  (we will get recipes this way)
    const recipes = [     // for now we will use this dummy data
        {
            id: 1,
            title: 'Recipe 1',
            description: 'This is a description for recipe 1'
        },
        {
            id: 2,
            title: 'Recipe 2',
            description: 'This is a description for recipe 2'
        },
        {
            id: 3,
            title: 'Recipe 3',
            description: 'This is a description for recipe 3'
        },
    ];
    return (
       <PageWrapper>
              {recipes.length > 0 ? recipes.map(recipe => (
                  <div key={recipe.id}>
                      <h1>{recipe.title}</h1>
                      <p>{recipe.description}</p>
                  </div>
              )) : <h1>No recipes found</h1>}
       </PageWrapper>
    );
};

export default MyRecipes;