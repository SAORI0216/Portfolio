"use client";

import React, { useState } from "react";

export default function ContactPage() {
  const[name,setName] = useState("");
  const[email,setEmail] = useState("");
  const[message,setMessage] = useState("");

  const handleSubmit = async(e:React.FormEvent) => {
    e.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacts`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({name,email,message})
    });
    alert("送信しました！");
    setName("");
    setEmail("");
    setMessage("");
  };
  return (
    <section className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-3xl px-6">
        <div className="w-full px-8 py-10 bg-white rounded-lg shadow-2xl dark:bg-gray-900">
              <h1 className="text-lg font-medium text-[#1c1c1a] dark:text-gray-200">
                お気軽にお問い合わせください。
              </h1>

              <form className="mt-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block mb-2 text-sm text-[#1c1c1a] dark:text-gray-200">
                    お名前
                  </label>
                  <input
                    type="text"
                    placeholder="やまだはなこ"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full px-5 py-3 mt-2 border rounded-md"
                    required
                  />
                </div>

                <div className="mt-6">
                  <label className="block mb-2 text-sm text-[#1c1c1a] dark:text-gray-200">
                    メールアドレス
                  </label>
                  <input
                    type="email"
                    placeholder="hanako@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-5 py-3 mt-2 border rounded-md"
                    required
                  />
                </div>

                <div className="mt-6">
                  <label className="block mb-2 text-sm text-[#1c1c1a] dark:text-gray-200">
                    メッセージ
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="block w-full h-32 px-5 py-3 mt-2 border rounded-md"
                    placeholder="Message"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 mt-6 text-white bg-[#cb8967] rounded-md hover:bg-[#f4e7d7]"
                >
                  送信
                </button>
              </form>
            </div>
          </div>
    </section>
  )
}
