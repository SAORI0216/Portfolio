import { IconType } from "react-icons";
import { 
    SiNextdotjs,
    SiTypescript,
    SiTailwindcss,
    SiFastapi,
    SiPython,
    SiPostgresql,
    SiDocker,
    SiMysql,
    SiNodedotjs,
    SiExpress,
    SiPrisma,
    SiRedis,
    SiAwslambda,
    SiFirebase,
    SiStripe,
    SiSwagger,
    SiDiagramsdotnet,
    SiFigma,
    SiLine,
 } from "react-icons/si";
 import { FaDatabase } from "react-icons/fa6";
 import { BsBank } from "react-icons/bs";


type Skill = {
    id:number;
    name:string;
    category:string;
    display_order:number;
}

const skillIconMap:Record<string,IconType> = {
    "Next.js（App Router）": SiNextdotjs,
    TypeScript: SiTypescript,
    "Tailwind CSS": SiTailwindcss,

    FastAPI: SiFastapi,
    Python: SiPython,
    PostgreSQL: SiPostgresql,
    MySQL: SiMysql,
    "Node.js": SiNodedotjs,
    Express: SiExpress,
    Prisma: SiPrisma,
    SQLAlchemy:FaDatabase,
    Redis: SiRedis,

    "Firebase Authentication": SiFirebase,
    "Firebase Storage": SiFirebase,

    Docker: SiDocker,
    "AWS Lambda": SiAwslambda,

    Stripe: SiStripe,
    "LINE Official Account Manager": SiLine,
    "GMOあおぞらネット銀行 API（sunabar）":BsBank,
    Swagger: SiSwagger,
    "draw.io": SiDiagramsdotnet,
    figma: SiFigma,
};
const skillColorMap:Record<string,string> = {
   "Next.js（App Router）": "#000000",
   TypeScript: "#1677C7", 
   "Tailwind CSS": "#00ACC1",
   FastAPI:"#009688",
   Python:"#000000",
   PostgreSQL: "#32648D",
   MySQL: "#105E86",
   "Node.js": "#84ce24",
   Express: "#000000",
   Prisma: "#02364e",
   SQLAlchemy:"#cd2103",
   Redis: "#B71C1C",

   "Firebase Authentication": "#dd2c00",
   "Firebase Storage": "#dd2c00",

   Docker: "#2395EC",
   "AWS Lambda": "#F78E05",
   Stripe: "#646FDE",
   "LINE Official Account Manager":"#00C300",
   "GMOあおぞらネット銀行 API（sunabar）":"#00a7f3",
   
   Swagger: "#FFCA28",
   "draw.io": "#ff8100",
   figma: "#000000",
}

async function getSkills():Promise<Skill[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skills`,{
        cache:"no-store",
    });
    if(!res.ok){
        throw new Error("Failed to fetch skills")
    }
    return res.json();
}

export default async function SkillSection(){
    const skills = await getSkills();

    //🟢カテゴリごとにまとめる
    const grouped:Record<string,Skill[]> = {};
    for(const skill of skills){
        if(!grouped[skill.category]){
            grouped[skill.category] = [];
        }
        grouped[skill.category].push(skill);
    }
    return(
        <section>
            <h2 className="mb-6 text-2xl font-bold border-b border-[#cb8967] pb-2">
                Skills
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {Object.entries(grouped).map(([category,skills]) => (
                <div key={category} className="rounded-xl bg-[#faf7f3] p-6 shadow-sm">
                    <h3 className="mb-4 font-semibold text-[#000000]">
                    {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => {
                           const Icon = skillIconMap[skill.name];
                           return(
                            <div
                            key={skill.id}
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
                              {Icon && <Icon className="text-lg" style={{color:skillColorMap[skill.name] ?? "#000000"}}/>} 
                              <span className="font-medium">{skill.name}</span> 
                            </div>
                              );
                            })}
                        </div>
                    </div>
                 ))}
            </div>
        </section>
    );
}