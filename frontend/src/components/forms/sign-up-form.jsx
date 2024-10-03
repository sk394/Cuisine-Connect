"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";

const SignUpForm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);  // To handle any errors
    const form = useForm({});
    const router = useRouter();  

    // Register User function to handle the signup
    const registerUser = async (data) => {
        try {
            setLoading(true);
            setError(null);

            // Send a POST request to your signup endpoint
            const response = await axios.post("../../api/auth/register", {
                name: data.name,
                email: data.email,
                password: data.password,
            });

            // Handle successful response (redirect, notify user, etc.)
            console.log('User registered successfully:', response.data);

            // Redirect to a success page or the login page
            router.push('/auth/signin');
        } catch (err) {
            console.error('Error registering user:', err);
            setError(err?.response?.data || 'Failed to register user');
        } finally {
            setLoading(false);
        }
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(registerUser)} className="w-full space-y-2">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    type="string"
                                    placeholder="Enter your name..."
                                    disabled={loading}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="Enter your email..."
                                    disabled={loading}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="*********"
                                    disabled={loading}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={loading} className="ml-auto w-full" type="submit">
                    Signup With Email
                </Button>
            </form>
        </Form>
    );

};

export default SignUpForm;



      
