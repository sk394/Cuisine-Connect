'use client'

import React, { useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import RecipePostViewer from './recipe-viewer'

const RecipePostWrapper = ({ posts }) => {
  const [currentPostIndex, setCurrentPostIndex] = useState(0);

  const handlers = useSwipeable({
    onSwipedUp: () => setCurrentPostIndex((prevIndex) => Math.min(prevIndex + 1, posts.length - 1)),
    onSwipedDown: () => setCurrentPostIndex((prevIndex) => Math.max(prevIndex - 1, 0)),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div {...handlers} className="h-screen flex flex-col overflow-y-scroll snap-y snap-mandatory scrollbar-hide gap-2 mt-2">
      {posts.map((post, index) => (
        <div
          key={post.id}
          className={`snap-center h-screen flex flex-col justify-center items-center transition-opacity duration-300 ${
            index === currentPostIndex ? 'opacity-100' : 'opacity-50'
          }`}
        >
          <RecipePostViewer post={post} isVisible={index === currentPostIndex} />
        </div>
      ))}
    </div>
  );
}

export default RecipePostWrapper;

