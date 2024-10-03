import Navigation from "./navigation";
import Sidebar from "./sidebar";
import ThemeToggle from "./theme-toggle";
import { cn } from "@/lib/utils";

const Header = ({ className }) => {
    return(
        <header className="sticky inset-x-0 top-0 w-full">
            <nav className="flex items-center justify-between px-4 py-2 md:justify-end">
                <div className={cn("block lg:hidden")}>
                </div>
                <div className="flex items-center gap-2">
                     <Navigation />
                    <ThemeToggle />
                </div>
            </nav>
        </header>
    )
};

export default Header;