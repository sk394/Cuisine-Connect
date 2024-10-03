"use client";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SignUpForm from "@/components/forms/sign-up-form";

const Signup = () => {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-zinc-900" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <Link href="/" className="font-mono text-lg font-bold">Recipe App</Link>
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            Sign in to your account to access your recipes and do more other interesting stuff....
                        </p>
                    </blockquote>
                </div>
            </div>
            <div className="flex h-full items-center p-4 lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="space-y-2">
                        <Button
                            className="w-full"
                            onClick={() => signIn("github")}
                        >
                            Sign in With Github
                        </Button>
                        <Button
                            className="w-full"
                            onClick={() => signIn("google")}
                        >
                            Sign in With Google
                        </Button>
                    </div>
                    <Separator className="text-muted-foreground" />
                    <div className="flex flex-col space-y-2 text-center">
                        <SignUpForm />
                        <div className="mt-5">
                            <span>
                             Already have an account?{" "}
                                <Link className="text-blue-700" href="/auth/signin">
                                Signin
                            </Link>{" "}
                            </span>   
                        </div>      
                    </div>
                </div>
            </div>
        </div>
  );
};

export default Signup;




