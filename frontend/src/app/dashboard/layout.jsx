import Header from "@/components/dashboard-layout/header";
import Sidebar from "@/components/dashboard-layout/sidebar";
import { headers } from "next/headers";

export const metadata={
    title: 'Cuisine Connect',
    description:'Recipe Dashboard',
}

export default function DashboardLayout({children}){ 
    return (
        <div className="flex">
            <Sidebar className="fixed" />
            <main className="w-full flex-1 overflow-hidden pl-44 ml-10">
                <Header />
            {children}
            </main>
        </div>
    );
}