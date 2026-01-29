type Work = {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
};
const worksData: Work[] = [
  {
    id: 1,
    title: "成分かんたん比較アプリ",
    description: "アレルギー対応・成分比較ができるWebアプリ",
    techStack: ["Next.js", "FastAPI", "PostgreSQL"],
    githubUrl: "https://github.com/SAORI0216/shokumiru",
  },
  {
    id: 2,
    title: "リモート参拝アプリ",
    description: "LINE Botで神社参拝・お守り購入ができるアプリ",
    techStack: ["Node.js", "LINE API", "AWS Lambda"],
    githubUrl: "https://github.com/SAORI0216/sannpai-chatbot",
  },
];

export default function WorksSection(){
    return(
        <section>
            <h2 className="mb-6 text-2xl font-bold border-b border-[#cb8967] pb-2">
                Works
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
                {worksData.map((work) => (
                    <div key={work.id} className="rounded-xl bg-[#faf7f3] p-6 shadow-sm flex flex-col justify-between transition duration-300 hover:-translate-y-1 hover:shadow-md">
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold">{work.title}</h3>
                            <p className="text-sm text-gray-700">{work.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {work.techStack.map((tech) => (
                                        <span key={tech}  className="rounded-full bg-[#f4e7d7] px-3 py-1 text-xs">
                                        {tech}
                                        </span>
                                    ))}
                                </div>
                        </div>
                        <a
                        href={work.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block text-sm text-[#cb8967] hover:underline hover:opacity-80"
                        >
                        GitHubを見る →
                        </a>
                    </div>
                ))}
            </div>
        </section>
    )
}