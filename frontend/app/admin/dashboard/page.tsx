"use client";

import Link from "next/link";
import { useEffect,useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function AdminDashbordPage() {
  const [contacts,setContacts] = useState([]);
  const [works,setWorks] = useState([]);
  const totalContacts = contacts.length;
  const totalWorks = works.length;

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth,async(user) =>{
        if(!user) return;

        const token = await user.getIdToken();

        const [contactsRes,workRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacts`,{
            headers:{
              Authorization:`Bearer ${token}`,
            },
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/works`,{
            headers:{
              Authorization:`Bearer ${token}`,
            },
          }),
        ]);
        setContacts(await contactsRes.json());
        setWorks(await workRes.json());
      });
      return() => unsubscribe();
  },[]);

  return (
    <div className="space-y-8">
    {/* タイトル */}
      <h1 className="text-2xl font-bold mb-4">
        Dashboard
      </h1>
    {/* カード一覧 */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* お問い合わせ */}
      <Link
      href="/admin/dashboard/contacts"
      className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-lg hover:-tranclate-y-1 hover:border-[#cb8967]">
        <h2 className="text-lg font-medium text-[#1c1c1a]">
          Contacts
        </h2>
        <div className="mt-4 space-y-1 text-sm text-[#1c1c1a]">
          <p>合計：<span className="font-semibold ">{totalContacts}</span>  件</p>
        </div>
      </Link>
      {/* 実績 */}
      <Link
      href="/admin/dashboard/works"
      className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-lg hover:-tranclate-y-1 hover:border-[#cb8967]">
        <h2 className="text-lg font-medium text-[#1c1c1a]">
          Works
        </h2>
        <div className="mt-4 space-y-1 text-sm text-[#1c1c1a]">
          <p>登録数：<span className="font-semibold">{totalWorks}</span>  件</p>
        </div>
      </Link>
    </div>
  </div>
  );
}
