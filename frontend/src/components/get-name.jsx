"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "./ui/button";

export default function GetName(){
    const [num, setNum] = useState(0);
    const {data: session} = useSession();  // get session in client side
    return (
        <div>
            <h1>Get Name</h1>
            <Button onClick={() =>setNum(num + 2)}>{session?.user?.name},  {num}</Button>
        </div>
    );
}