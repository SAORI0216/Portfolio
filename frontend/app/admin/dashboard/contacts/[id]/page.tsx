"use client";

import { useParams,useRouter } from "next/navigation";
import { useState,useEffect } from "react";

const statusOptions = [
  { value: "unhandled", label: "未対応" },
  { value: "handling", label: "対応中" },
  { value: "done", label: "対応済" },
];
type Contact = {
  id:number;
  name:string;
  email:string;
  message:string;
  status:string;
  admin_memo:string | null;
  created_at:string;
};

export default function ContactDetailPage(){
    const router = useRouter();
    const params = useParams();
    const[contact,setContact] = useState<Contact | null>(null);
    const[status,setStatus] = useState("");
    const[memo,setMemo] = useState("");
    const handleSave = async() =>{
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacts/${params.id}`,
            {
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    status:status,
                    admin_memo:memo,
                }),
            }
        );

        alert("保存完了！");
    };
  useEffect(() =>{
    if(!params.id) return;
        
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacts/${params.id}`)
      .then(res=>res.json())
      .then(data=>{
        setContact(data);
        setStatus(data.status);
        setMemo(data.admin_memo ?? "");
    });
  },[params.id]);
    if(!contact){
        return <div className="p-10">読み込み中...</div>;
    }
    return(
    
        <div className="max-w-3xl">
        {/* 一覧へ戻る */}
        <button onClick={() => router.push("/admin/dashboard/contacts")} className="mb-6 text-sm text-gray-500 hover:underline">
            ←  一覧に戻る
        </button>

        <h1 className="text-2xl font-semibold mb-6 p-6">お問い合わせ詳細</h1>
        {/* 基本情報 */}
        <div className="rounded-xl border bg-white p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="text-[#cb8967]">名前：</p>
                    <p className="text-[#1c1c1a]">{contact?.name}</p>
                </div>
                <div>
                    <p className="text-[#cb8967]">メールアドレス：</p>
                    <p className="text-[#1c1c1a]">{contact?.email}</p>
                </div>
                <div>
                    <p className="text-[#cb8967]">受信日時：</p>
                    <p className="text-[#1c1c1a]">{contact?.created_at}</p>
                </div>
            </div>
        </div>
        {/* 本文 */}
        <div className="rounded-xl border bg-white p-6 mb-6">
            <p className="text-sm text-[#cb8967] mb-2">お問い合わせ内容</p>
            <p className="whitespace-pre-wrap">{contact?.message}</p>
        </div>
        {/* ステータス */}
        <div className="rounded-xl border bg-white p-6 mb-6">
            <label className="block text-sm text-[#cb8967] mb-2">ステータス</label>
            <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
            className="w-48 rounded-md border px-3 py-2 text-sm"
            >
            {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
            </select>
        </div>
        {/* 管理者メモ */}
        <div className="rounded-xl border bg-white p-6 mb-6">
            <label className="block text-sm text-[#cb8967] mb-2">管理者メモ</label>
            <textarea 
            value={memo} 
            onChange={(e) => setMemo(e.target.value)}
            rows={4}
            className="w-full rounded-md border px-3 py-2 text-sm"
            placeholder="対応内容や補足メモを記入"
            />
        </div>
        {/* 保存 */}
        <div className="flex justify-end">
            <button onClick={handleSave}className="rounded-md bg-[#cb8967] px-6 py-2 text-white hover:bg-[#f4e7d7]">保存する</button>
        </div>
        </div>
    );
}