import Image from "next/image";

type Profile = {
  id:number;
  name:string;
  bio:string;
  profile_image_url:string | null;
  zenn_url:string | null;
}

async function getProfile():Promise<Profile> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`,{
        cache:"no-store",
    });
  if (!res.ok){
    throw new Error("Failed to fetch profile");
  }
  return res.json();
}

export default async function AboutPage() {
  const profile = await getProfile();

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-12 items-center">
        
        {/* 左：プロフィール画像 */}
        <div className="flex justify-center">
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-lg">
            <Image
              src={profile.profile_image_url ?? "/profile.png"}
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
            {profile.bio.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
