"use client";

import { useEffect, useState } from "react";

type Skill = {
  id:number;
  name:string;
  category:string;
  display_order:number;
};

export default function WorksPage() {
  const[skills,setSkills] = useState<Skill[]>([]);
  const[editingId,setEditingId] = useState<number | null>(null);
  const[editForm,setEditForm] = useState<Skill | null>(null);
  const[newSkill,setNewSkill] = useState({name:"",category:"Frontend",display_order:0,});


  useEffect(() => {
    fetchSkills();
  },[]);

  async function fetchSkills() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skills`);
    const data = await res.json();
    setSkills(data);
  }

  function handleEdit(skill:Skill){
    setEditingId(skill.id);
    setEditForm(skill);
  }

  async function handleSave() {
    if(!editForm) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/skills/${editForm.id}`,
      {
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(editForm),
      }
    );
    if(!res.ok){
      alert("更新に失敗しました");
      return;
    }
    setEditingId(null);
    setEditForm(null);
    fetchSkills();
  }

  async function handleDelete(id:number) {
    const ok = confirm("本当に削除しますか？");
    if(!ok) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/skills/${id}`,
      {method:"DELETE"}
    );

    if(!res.ok){
      alert("削除に失敗しました");
      return;
    }
    fetchSkills();
  }

  async function handleCreate() {
    if(!newSkill.name){
      alert("技術名を入力してください");
      return;
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/skills`,
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(newSkill),
      }
    );
    if(!res.ok){
      alert("追加に失敗しました")
      return;
    }
    setNewSkill({
      name:"",
      category:"Frontend",
      display_order:0,
    });
    fetchSkills();
  }
  return (
  <div className="space-y-2">
    <div className="flex gap-2 mb-6">
      <input
        placeholder="技術名"
        value={newSkill.name}
        onChange={(e) => setNewSkill({...newSkill,name:e.target.value})}
        className="border p-2 rounded"
      />
      <select
        value={newSkill.category}
        onChange={(e) => setNewSkill({...newSkill,category:e.target.value})}
        className="border p-2 rounded"
      >
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="Infra/Cloud">Infra/Cloud</option>
        <option value="External API/Service">External API/Service</option>
        <option value="Tools/Others">Tools/Others</option>
        <option value="Auth/BaaS">Auth/BaaS</option>
      </select>

      <input
        type="number"
        value={newSkill.display_order}
        onChange={(e) => setNewSkill({...newSkill,display_order:Number(e.target.value)})}
        className="border p-2 rounded w-24"
      />
      <button
        onClick={handleCreate}
        className="bg-[#cb8967] text-white px-4 rounded"
      >
        追加
      </button>
    </div>
    {skills.map((skill) => (
      <div key={skill.id} className="flex items-center gap-2 border p-2 rounded">
        {editingId === skill.id ?(
          <>
          <input
            value={editForm?.name || ""}
            onChange={(e) => setEditForm({...editForm!, name:e.target.value})}
            className="border p-1 rounded"
          />
          <select
            value={editForm?.category}
            onChange={(e) => setEditForm({...editForm!,category:e.target.value})}
            className="border p-1 rounded"
          >
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Infra/Cloud">Infra/Cloud</option>
            <option value="Tools/Others">Tools/Others</option>
            <option value="Auth/BaaS">Auth/BaaS</option>
          </select>
          <input
            type="number"
            value={editForm?.display_order}
            onChange={(e) => setEditForm({...editForm!,display_order:Number(e.target.value),})}
            className="border p-1 rounded w-20"
          />
          <button
            onClick={handleSave}
            className="bg-[#cb8967] text-white px-2 py-1 rounded cursor-pointer"
          >
            保存
          </button>
          <button
            onClick={() =>handleDelete(skill.id)}
            className="text-red-500 cursor-pointer"
          >
            削除
          </button>
          <button
            onClick={() => setEditingId(null)}
            className="text-gray-500 cursor-pointer"
          >
            キャンセル
          </button>
          </>
        ) :(
          <>
          <span className="w-40">{skill.name}</span>
          <span className="w-40 text-sm text-gray-500">{skill.category}</span>
          <span className="w-20 text-sm">{skill.display_order}</span>
          <button
            onClick={() => handleEdit(skill)}
            className="text-[#cb8967]"
          >
            編集
          </button>
          </>
        )}
      </div>
    ))}
  </div>
)
  
}
