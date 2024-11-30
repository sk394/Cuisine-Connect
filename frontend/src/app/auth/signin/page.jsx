"use client";

import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from "@/components/ui/separator";
import SignInForm from "@/components/forms/sign-in-form";

const Signin = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = data;

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });
        if (result?.ok) {
            toast.success("Logged in successfully");
            setData({
                email: "",
                password: "",
            });
            window.location.href = "/";
        } else {
            toast.error("Invalid credentials");
        }
    };

    return (
        <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-zinc-900" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <Link href="/" className="font-mono text-lg font-bold">Cuisine Connect</Link>
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
                        <SignInForm  />
                            <div className="mt-5">
                                <p>
                                    Don&#39;t have an account?{" "}
                                    <Link className="text-blue-700 underline underline-offset-2" href="/auth/signup">
                                        Signup
                                    </Link>
                                </p>
                            </div>
                    </div>
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        By clicking login/signup, you agree to our terms and privacy policy.
                    </p>
                </div>
                </div>
                </div>
                );
};

export default Signin;



