"use client";

import React, { useState,useEffect } from "react";
import { ref,uploadBytes,getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

type Work = {
  id:number;
  title:string;
  description:string | null;
  tech_stack:string | null;
  github_url:string | null;
  image_url:string | null;
}


export default function WorkssPage() {
  const [works,setWorks] = useState<Work[]>([]);
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [techStack,setTechStack] = useState("");
  const [githubUrl,setGithubUrl] = useState("");
  const [imageUrl,setImageUrl] = useState("");
  const [editingId,setEditingId] = useState<number | null>(null);
  const [previewUrl,setPreviewUrl] = useState<string | null>(null);
  const [isUploading,setIsUploading] = useState(false);
  const [fileName,setFileName] = useState("");

  useEffect(() => {
    fetchWorks();
  },[]);

  // GET
  const fetchWorks = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/works`);
    const data = await res.json();
    setWorks(data);
  };
  // POST & PUT
  const handleSubmit = async() => {
    if(!title){
      alert("タイトルを入力してください");
      return;
    }
    const method = editingId ? "PUT" : "POST"
    const url = editingId ? `${process.env.NEXT_PUBLIC_API_URL}/works/${editingId}` : `${process.env.NEXT_PUBLIC_API_URL}/works`

    await fetch(url,{
      method,
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        title,
        description,
        tech_stack:techStack,
        github_url:githubUrl,
        image_url:imageUrl,
      }),
    });
    
    // 🌱フォームをリセットする
    setEditingId(null)
    setTitle("");
    setDescription("");
    setTechStack("");
    setGithubUrl("");
    setImageUrl("");

    fetchWorks();
  }

  //DELETE
  const handleDelete= async(id:number) => {
    const comfirmDelete = confirm("本当に削除しますか？");
    if(!comfirmDelete) return;

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/works`,{
      method:"DELETE",
    });

    fetchWorks();
  }
  //画像アップロード
  const handleImageUpload = async(
    e:React.ChangeEvent<HTMLInputElement>
  ) => {
    if(!e.target.files) return;

    const file = e.target.files[0];
    setFileName(file.name);

    //🌱プレビュー用URL生成
    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);

    try{
      setIsUploading(true);

      const strageRef = ref(storage,`works/${Date.now()}_${file.name}`);
      await uploadBytes(strageRef,file);

      const downloadURL = await getDownloadURL(strageRef);
      setImageUrl(downloadURL);
    } catch(error) {
      console.error("画像アップロード失敗",error);
      alert("画像アップロードに失敗しました");
    } finally {
      setIsUploading(false);
    }
  };


  return (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-6">Works編集</h1>
    {/* 追加・編集フォーム */}
    <div className="mb-8 p-6 bg-[#faf7f3] rounded-lg space-y-4">
      <h2 className="text-lg font-semibold">新規登録・編集</h2>
      <input
        type="text"
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#1c1c1a]"
      />
      <textarea
        placeholder="アプリの概要"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#1c1c1a]"
      />
      <input
        type="text"
        placeholder="技術スタック（/区切りで記載）"
        value={techStack}
        onChange={(e) => setTechStack(e.target.value)}
        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#1c1c1a]"
      />
      <input
        type="text"
        placeholder="GitHubのURL"
        value={githubUrl}
        onChange={(e) => setGithubUrl(e.target.value)}
        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#1c1c1a]"
      />
      <label className="inline-block">
        <span className="px-4 py-2 bg-[#cb8967] text-white rounded cursor-pointer">
          画像を選択
        </span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </label>
      <p className="text-sm text-gray-500 mt-2">{fileName || "画像が選択されていません"}</p>
      {/* 🌱画像アップロード中 */}
      {previewUrl && (
        <div className="mt-4">
          <img
            src={previewUrl}
            alt="preview"
            className="w-32 h-32 object-cover rounded"
          />
        </div>
      )}
      {isUploading && (
        <p className="text-blue-600 mt-2">画像アップロード中</p>
      )}
      
      <div className="flex justify-end">
        <button
        onClick={handleSubmit}
        disabled={isUploading}
        className="bg-[#cb8967] text-white px-4 py-2 rounded hover:opacity-80 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
        {isUploading ? "画像アップロード中..." : editingId ? "更新する" : "追加する"}
        </button>
      </div>
      
    </div>
    <div className="space-y-4">
      {works.map((work) =>(
        <div key={work.id} className="p-4 border rounded-lg flex justify-between items-center">
          <div>
            <p className="font-semibold">{work.title}</p>
            <p className="">{work.description}</p>
          </div>
          <div className="space-x-2">
            <button 
              onClick={() => {
                setEditingId(work.id);
                setTitle(work.title);
                setDescription(work.description ?? "");
                setTechStack(work.tech_stack ?? "");
                setGithubUrl(work.github_url ?? "");
                setImageUrl(work.image_url ?? "");

              }}
              className="text-[#cb8967] cursor-pointer"
            >
              編集
            </button>
            <button 
              onClick={() =>handleDelete(work.id)}
              className="text-red-500 cursor-pointer"
            >
              削除
            </button>
            {/* 🌱フォームをリセットする */}
            <button 
              onClick={() => {
                setEditingId(null);
                setTitle("");
                setDescription("");
                setTechStack("");
                setGithubUrl("");
                setImageUrl("");
                setPreviewUrl(null);
                setFileName("");
                }}
              className="text-[#a9a9a9] cursor-pointer"
            >
              キャンセル
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}
