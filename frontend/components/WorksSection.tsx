type Work = {
  id: number;
  title: string;
  description: string | null;
  tech_stack: string | null;
  github_url: string | null;
  image_url: string | null;
};

async function getWorks():Promise<Work[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/works`,{
        cache:"no-store",
    });
    if (!res.ok){
        throw new Error("Failed to fetch works");
    }

    return res.json();
}

export default async function WorksSection(){
    const works = await getWorks();

    return(
        <section>
            <h2 className="mb-6 text-2xl font-bold border-b border-dashed border-[#cb8967] pb-2">
                Works
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
                {works.map((work) => {
                    const techList = work.tech_stack?.split("/").map((t) => t.trim()) ?? [];

                    return(
                        <div key={work.id} className="rounded-xl bg-[#faf7f3] p-6 shadow-sm flex flex-col justify-between transition duration-300 hover:-translate-y-1 hover:shadow-md">
                            <div className="space-y-3">
                                <h3 className="flex items-center gap-3 text-lg font-semibold">
                                    {work.image_url && (
                                        <img
                                          src={work.image_url}
                                          alt={work.title}
                                          className="w-10 h-10 rounded-full object-cover border border-[#e8dccf]"
                                        />
                                    )}
                                    {work.title}
                                </h3>
                                {work.description &&(<p className="text-sm text-gray-700">{work.description}</p>)}
                                <div className="text-sm text-[#1c1c1a] flex flex-wrap gap-x-3 gap-y-1">
                                    {techList.length > 0 && (
                                        <p className="mt-1 text-xs text-[#1c1c1a] leading-relaxed">
                                            {techList.join(" ・ ")}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {work.github_url && (
                                <a
                                href={work.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-block text-sm text-[#cb8967] hover:underline hover:opacity-80"
                                >
                                 GitHubを見る →
                                </a>
                            )}                 
                        </div>
                    );
                })}
            </div>
        </section>
    );
}