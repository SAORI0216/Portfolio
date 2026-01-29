"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header(){
    const [open, setOpen] = useState(false);

    return(
        <header className="relative z-50 flex items-center justify-between p-4 -mt-5">
            <Link href="/" className="flex items-center">
                <Image
                    src="/portfolio-logo.png"
                    alt="Portfolio"
                    width={140}
                    height={40}
                    priority
                />
            </Link>

            <button 
            id="btn06"
            className={`btn-trigger z-50 ${open ? "active" : ""}`}
            onClick={() => setOpen(!open)}
            aria-label="menu"
            >
                <span />
                <span />
                <span />
            </button>

            {open && (
              <nav className="absolute top-16 right-4 z-40 rounded-2xl bg-white shadow-lg px-8 py-6">
                <ul className="space-y-4 text-base">
                    <li><Link href="/" onClick={() => setOpen(false)} className="block rounded-lg px-4 py-2 hover:bg-[#f4e7d7] transition">Skills</Link></li>
                    <li><Link href="/about" onClick={() => setOpen(false)} className="block rounded-lg px-4 py-2 hover:bg-[#f4e7d7] transition">About</Link></li>
                    <li><Link href="/contact" onClick={() => setOpen(false)} className="block rounded-lg px-4 py-2 hover:bg-[#f4e7d7] transition">Contact</Link></li>
                    <li><Link href="/login" onClick={() => setOpen(false)} className="block rounded-lg px-4 py-2 hover:bg-[#f4e7d7] transition">Login</Link></li>
                </ul>
              </nav>  
            )}
        </header>
    );
}