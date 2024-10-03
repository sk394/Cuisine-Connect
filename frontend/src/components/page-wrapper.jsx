import React from "react";
import { ScrollArea } from "./ui/scroll-area";


const PageWrapper = ({ children, scrollable=false }) => {
    return (
        <>
         {scrollable ? (
            <ScrollArea className="h-[calc(100dvh-52px)]">
                <div className="h-full p-4 md:px-8">
                    {children}
                </div>
            </ScrollArea>
         ) : (
            <div className="h-full p-4 md:px-8">
                {children}
            </div>
         )}
        </>
    );
}

export default PageWrapper;