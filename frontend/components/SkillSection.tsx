type Skill = {
    name:string;
    icon:string;
}

type Skillcategory = {
    category:string;
    skills:Skill[];
};

const skillData:Skillcategory[] =[
    {
    category: "Frontend",
    skills: [
        { name: "Next.js", icon: "⚛️" },
        { name: "TypeScript", icon: "📘" },
        { name: "Tailwind CSS", icon: "🎨" },
      ],
    },
    {
    category: "Backend",
    skills: [
        { name: "FastAPI", icon: "🚀" },
        { name: "Python", icon: "🐍" },
        { name: "PostgreSQL", icon: "🐘" },
      ],
    },
    {
    category: "Others",
    skills: [
        { name: "Firebase", icon: "🔥" },
        { name: "Stripe", icon: "💳" },
        { name: "Docker", icon: "🐳" },
      ],
    },
];

export default function SkillSection(){
    return(
        <section>
            <h2 className="mb-6 text-2xl font-bold border-b border-[#cb8967] pb-2">
                Skills
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
                {skillData.map((group) => (
                    <div key={group.category} className="rounded-xl bg-[#faf7f3] p-6 shadow-sm">
                        <h3 className="mb-4 font-semibold text-[#cb8967]">
                             {group.category}
                        </h3>
                         <div className="flex flex-wrap gap-2">
                             {group.skills.map((skill) => (
                                <div
                                key={skill.name}
                                className="
                                    flex items-center gap-2
                                    rounded-full
                                    bg-[#f4e7d7]
                                    px-4 py-2
                                    text-sm
                                    shadow-sm
                                    transition
                                    hover:scale-105
                                "
                                >
                                    <span>{skill.icon}</span>
                                    <span className="font-medium">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                 ))}
            </div>
        </section>
    )
}