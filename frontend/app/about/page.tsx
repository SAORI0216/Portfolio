import Image from "next/image";

const profile = {
  name:"Saori",
  imageUrl:"/profile.png",
  bio:[
    "大学卒業後、家庭紙専門商社で営業を経験。",
    "その後、国家公務員として6年間勤務。",
    "2025年よりエンジニアを志し、コーディングブートキャンプに参加。",
    "FastAPI × Next.js を用いたチーム開発を経験しています。",
  ],
}

export default function AboutPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 items-center">
        
        {/* 左：プロフィール画像 */}
        <div className="flex justify-center">
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-lg">
            <Image
              src={profile.imageUrl}
              alt={`${profile.name} profile image`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* 右：BIO */}
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {profile.name}
          </h1>
          <div className="space-y-1 text-gray-700 leading-relaxed break-anywhere pr-1">
            {profile.bio.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
