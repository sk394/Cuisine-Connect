import Header from "@/components/dashboard-layout/header";
import Sidebar from "@/components/dashboard-layout/sidebar";

export const metadata={
    title: 'Recipe Dashboard',
    description:'Recipe Dashboard',
}

export default function DashboardLayout({children}){
    return (
        <div className="flex">
            <Sidebar />
            <main className="w-full flex-1 overflow-hidden">
                <Header />
            {children}
            </main>
        </div>
    );
}