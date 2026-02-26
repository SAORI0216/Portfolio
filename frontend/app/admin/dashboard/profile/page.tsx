"use client";

import React, { useState,useEffect,useRef } from "react";
import { getStorage,ref,uploadBytes,getDownloadURL } from "firebase/storage";
import { app } from "@/lib/firebase";

type Profile = {
  id:number;
  name:string;
  bio:string;
  profile_image_url:string | null;
  zenn_url:string | null;
};
type Skill = {
  id:number;
  name:string;
  category:string;
  display_order:number;
};

export default function ProfilePage() {
  const strage = getStorage(app);
  const[profile,setProfile] = useState<Profile | null>(null);
  const[skills,setSkills] = useState<Skill[]>([]);
  const[selectedFile,setSelectedFile] = useState<File | null>(null);
  const[previewUrl,setPreviewUrl] = useState<string | null>(null);
  const[isSaving,setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  

  useEffect(() => {
    fetchProfile();
    fetchSkills();
  },[]);

  async function fetchProfile() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`);
    const data = await res.json();
    setProfile(data);
  }
  async function fetchSkills() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skills`);
    const data = await res.json();
    setSkills(data);
    
  }
  function handleImageClick(){
    fileInputRef.current?.click();
  }
  function handleImageChange(e:React.ChangeEvent<HTMLInputElement>){
    const files = e.target.files;
    if(!files || files.length === 0) return;

    const file = files[0];
    setSelectedFile(file);

    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);
  }

  async function updateProfile() {
    if(!profile) return;

    //🌱保存開始
    setIsSaving(true);

    try{
    let imageUrl = profile.profile_image_url;
    
    // 🌱新しい画像が選択されていたら、アップロード
    if(selectedFile){
      const strageRef = ref(
        strage,
        `profiles/${profile.id}-${Date.now()}`
      );

      await uploadBytes(strageRef,selectedFile);
      imageUrl = await getDownloadURL(strageRef)
    }
    const updateProfile = {
      ...profile,
      profile_image_url: imageUrl,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/${profile.id}`,
      {
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(updateProfile),
      }
    );
    if(!res.ok){
      alert("プロフィールの更新に失敗しました")
      return;
    }
    setProfile(updateProfile);
    setSelectedFile(null);
    setPreviewUrl(null);

    alert("保存しました！");
  } finally{
    setIsSaving(false);
  }
}
  return (
  <div className="max-w-4xl mx-auto p-8 space-y-12">
    {/* プロフィール編集 */}
    {profile && (
      <div className="bg-[#faf7f3] p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-bold">プロフィール編集</h2>
        {/* 画像編集 */}
        <div className="flex flex-col items-center space-y-2">
          <div className="relative w-40 h-40">
            <img
            src={
              previewUrl || profile.profile_image_url || "default-avatar.png"
            }
            alt="profile"
            className="w-40 h-40 rounded-full object-cover cursor-pointer border-4 border-gray-300"
            onClick={handleImageClick}
            />
            <div className="absolute inset-0 flex items-center justify-center
                            bg-black bg-opacity-40 text-white text-sm
                            opacity-0 hover:opacity-100 rounded-full transition cursor-pointer"
                onClick={handleImageClick}
            >
              変更
            </div>
          </div>
          <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
          />
        </div>
        {/* 名前編集 */}
        <input
          type="text"
          value={profile.name}
          onChange={(e) => setProfile({...profile,name:e.target.value})}
          className="w-full border p-2 rounded"
        />
        {/* BIO編集 */}
        <textarea
          value={profile.bio}
          onChange={(e) => setProfile({...profile,bio:e.target.value})}
          className="w-full border p-2 rounded h-40"
        />
        <button
          onClick={updateProfile}
          disabled={isSaving}
          className="bg-[#cb8967] text-white px-4 py-2 rounded disabled:opacity-50 cursor-pointer"
        >
        {isSaving ? "保存中・・・" : "保存"}
        </button>
      </div>
    )}
  </div>
  );
}
