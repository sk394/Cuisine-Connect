"use client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./theme-provider";


export default function Providers({children }) {
  
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SessionProvider>
                {children}
            </SessionProvider>
        </ThemeProvider>
    );
}