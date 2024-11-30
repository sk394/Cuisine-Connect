"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import { usePathname } from "next/navigation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import Link from "next/link";
import { cn } from "@/lib/utils";

const SidebarNav = ({items, setOpen, isMobileNav=false,}) =>{
  const path = usePathname();
  const {isMinimized} = useSidebar();

  if(!items.length) return null;

  return (
    <nav className="grid items-start gap-2">
      <TooltipProvider>
        {items.map((item, index) => {
          return (
            item.href && (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                {isMobileNav || (!isMinimized && !isMobileNav) ? (
                  <Link
                    href={item.disabled ? '/' : item.href}
                    className={cn(
                      'flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                      path === item.href ? 'bg-accent' : 'transparent',
                      item.disabled && 'cursor-not-allowed opacity-80'
                    )}
                    onClick={() => {
                      if (setOpen) setOpen(false);
                    }}
                  >
                    {item?.icon}
                     
                      <span className="mr-2 truncate">{item.title}</span>
                    
                  </Link>)
               : null}
                </TooltipTrigger>
                <TooltipContent
                  align="center"
                  side="right"
                  sideOffset={8}
                  className={!isMinimized ? 'hidden' : 'inline-block'}
                >
                  {item.title}
                </TooltipContent>
              </Tooltip>
            )
          );
        })}
      </TooltipProvider>
    </nav>
  )
}

export default SidebarNav;