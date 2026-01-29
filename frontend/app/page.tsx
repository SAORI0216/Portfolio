import SkillSection from "@/components/SkillSection";
import WorksSection from "@/components/WorksSection";

export default function Home() {
    return (
    <div className="text-[#1c1c1a]">
      <div className="mx-auto max-w-5xl px-4 py-12 space-y-20">
        {/* Hero */}
        <section className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Saori Portfolio</h1>
          <p className="text-sm md:text-base">
            Webエンジニア / ポートフォリオサイト
          </p>
        </section>

        {/* Skills */}
        <SkillSection />

        {/* Works */}
        <WorksSection />
      </div>
    </div>
  );
}
