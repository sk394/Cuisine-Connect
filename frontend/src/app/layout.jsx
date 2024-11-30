import NextTopLoader from "nextjs-toploader";
import { cn } from "../../lib/utils"
import { SmoothScrollProvider } from "../../providers/smooth-scroll-provider";
import "./globals.css"
import { Inter } from 'next/font/google';
import Providers from "../../providers/session-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Recipial',
    description: 'Social media for sharing recipes',
  };

export default async function RootLayout({ children}){
  return (
    <html lang="en">
      <body
        className={`${inter.className} overflow-hidden `}
        suppressHydrationWarning={true}
      >
        <NextTopLoader showSpinner={false} />
          <Providers> 
            {children}
          </Providers>
        <Toaster />
      </body>
    </html>
  )
}