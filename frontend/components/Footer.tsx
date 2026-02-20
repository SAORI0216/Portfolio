import { FaGithub,FaXTwitter } from "react-icons/fa6";
import { SiZenn } from "react-icons/si";

export default function Footer(){
  return( 
  <footer className="w-full bg-[#cb8967]"> 
    <div className="mx-auto max-w-5xl py-6 text-center space-y-4">
      {/* SNSアイコン */}
      <div className="flex justify-center gap-6 text-white text-xl">
        <a
         href="https://github.com/SAORI0216"
         target="_blank"
         rel="noopener noreferrer"
         className="hover:opacity-70 transition"
        >
          <FaGithub />
        </a>
        <a
         href="https://zenn.dev/saorinn"
         target="_blank"
         rel="noopener noreferrer"
         className="hover:opacity-70 transition"
        >
          <SiZenn />
        </a>
        <a
         href="https://x.com/0216saorinn"
         target="_blank"
         rel="noopener noreferrer"
         className="hover:opacity-70 transition"
        >
          <FaXTwitter />
        </a>

      </div>

      {/* コピーライト */}
      <p className="text-sm text-white">
        © {new Date().getFullYear()} Saori Portfolio
      </p> 
      {/* クレジット */}
      <p className="text-xs text-white/80">
        Icon by{" "}
        <a
         href="https://icons8.com"
         target="_blank"
         rel="noopener noreferrer"
         className="underline hover:opacity-80"
        >
          Icons8
        </a>
      </p>
    </div> 
  </footer> 
  ); 
}
