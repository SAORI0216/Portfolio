"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LogoutButton(){
    const router = useRouter();

    const handleLogout = async() => {
        await signOut(auth);
        router.push("/login");
    };

    return(
        <button
          onClick={handleLogout}
          className="rounded px-3 py-2 hover:bg-[#cb8967] text-left"
        >
          Logout
        </button>
    );
}