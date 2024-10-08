"use client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./theme-provider";
import ReactQueryProvider from "./react-query-provider";


export default function Providers({children }) {
  
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SessionProvider>
                <ReactQueryProvider>
                {children}
                </ReactQueryProvider>
            </SessionProvider>
        </ThemeProvider>
    );
}