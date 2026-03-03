"use client";

import { ReactNode,use,useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AuthGuard({children} : {children:ReactNode}){
    const router = useRouter();
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,(user) => {
            if(!user) {
                router.push("/login");
            } else {
                setLoading(false);
            }
        });

        return() => unsubscribe();
    },[router]);

    if(loading) return <div>Loading・・・</div>;

    return <>{children}</>
}