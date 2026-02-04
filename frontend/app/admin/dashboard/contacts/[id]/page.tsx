"use client";

import { useParams,useRouter } from "next/navigation";
import { useState } from "react";

const dummyContact = {
  id: 1,
  name: "田中 太郎",
  email: "tanaka@example.com",
  message:
    "ポートフォリオ制作について相談したいです。お時間をいただけますでしょうか。",
  status: "unhandled",
  memo: "",
  createdAt: "2026/01/20 14:30",
};
const statusOptions = [
  { value: "unhandled", label: "未対応" },
  { value: "handling", label: "対応中" },
  { value: "done", label: "対応済" },
];

export default function ContactDetailPage(){
    const router = useRouter();
    const params = useParams();
    const [status,setStatus] = useState(dummyContact.status);
    const [memo,setMemo] = useState(dummyContact.memo);

    const handleSave = () =>{
        //⭐あとでＡＰＩに差し替え
        console.log({
            id:params.id,
            status,
            memo,
        });

        alert("保存しました（ダミー）");
    };
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
                    <p className="text-[#1c1c1a]">{dummyContact.name}</p>
                </div>
                <div>
                    <p className="text-[#cb8967]">メールアドレス：</p>
                    <p className="text-[#1c1c1a]">{dummyContact.email}</p>
                </div>
                <div>
                    <p className="text-[#cb8967]">受信日時：</p>
                    <p className="text-[#1c1c1a]">{dummyContact.createdAt}</p>
                </div>
            </div>
        </div>
        {/* 本文 */}
        <div className="rounded-xl border bg-white p-6 mb-6">
            <p className="text-sm text-[#cb8967] mb-2">お問い合わせ内容</p>
            <p className="whitespace-pre-wrap">{dummyContact.message}</p>
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