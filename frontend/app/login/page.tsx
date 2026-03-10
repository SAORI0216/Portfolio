"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try{
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      //⭐あとでAPIに送る
      console.log("token:",token);
      router.push("/admin/dashboard");

    } catch(error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-4">
          <div className="flex justify-center mx-auto">
              <Image
                src="/admin-logo.png"
                alt="Admin Logo"
                width={140}
                height={60}
                className="h-20 w-auto"
                priority
              />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-center tracking-wide">
            Admin Login
          </h3>

          <p className="mt-1 text-center text-sm text-gray-500 dark:text-gray-400">
            For Administrator
          </p>

          <form onSubmit={handleSubmit}className="mt-4">
            <div className="w-full">
              <input
                type="email"
                value={email}
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border rounded-lg
                  dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200
                  focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none"
              />
            </div>

            <div className="w-full mt-4">
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border rounded-lg
                  dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200
                  focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none"
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 mt-6 text-white bg-[#cb8967] rounded-md hover:bg-[#f4e7d7]"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
