"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Copy, Share2 } from "lucide-react";
import { FacebookIcon, FacebookShareButton, TwitterShareButton, XIcon } from "react-share";

const ShareButton = () => {
  const shareUrl = "https://localhost:3000/dashboard";
  
    const copyToClipboard = () => {
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert("URL copied to clipboard!");
      }).catch(err => {
        console.error("Failed to copy: ", err);
      });
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <button className="flex flex-col gap-1">
               <Share2 className="h-8 w-8" />  
            </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" className="w-1 flex flex-col items-center justify-center">
              <DropdownMenuItem>
                <FacebookShareButton url={shareUrl} >
                   <FacebookIcon size={32} round />
                </FacebookShareButton>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <TwitterShareButton url={shareUrl} >
                  <XIcon size={32} round />
                  </TwitterShareButton>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button variant="icon" onClick={copyToClipboard}>
                  <Copy className="h-8 w-8" />
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
    )
}

export default ShareButton;