"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import { ChevronLeft, CookingPot, Plus, UserPen, Utensils } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SidebarNav from "./sidebar-nav";

const Sidebar = ({ className }) => {
    const { isMinimized, toggle } = useSidebar();
    const handleToggle = () => {
        toggle();
    };
    const items = [
        {
            title: 'Create Recipe',
            href: '/dashboard/create-recipe',
            icon: <Plus className="ml-3 size-5 flex-none" />,
            label: 'Create Recipe'
        },
        {
            title: 'Recipe Generator',
            href: '/dashboard/recipe-generator',
            icon: <CookingPot className="ml-3 size-5 flex-none" />,
            label: 'Recipe Generator'
        },
        {
            title: 'My Recipes',
            href: '/dashboard/my-recipes',
            icon: <Utensils className="ml-3 size-5 flex-none" />,
            label: 'Check my rceipes'
        },
        {
            title: 'Profile',
            href: '/dashboard/profile',
            icon: <UserPen className="ml-3 size-5 flex-none" />,
            label: 'profile'
        },
    ];

    return (
        <aside className={
            cn(`relative hidden h-screen flex-none  bg-card transition-[width] duration-500 md:block`,
                !isMinimized ? 'w-72 border-r' : 'hidden',
                className)}
        >
            <div className="hidden p-5 pt-10 lg:block">
                <div className="relative z-20 flex items-center text-lg font-medium">
                    {!isMinimized ? <Link href="/" className="font-mono text-lg font-bold">Cuisine Connect</Link> :
                        null}
                </div>
            </div>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <div className="mt-3 space-y-1">
                        <SidebarNav items={items} />
                    </div>
                </div>
            </div>
        </aside>

    );
};

export default Sidebar;