"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header(){
    const [open, setOpen] = useState(false);

    return(
        <header className="flex items-center justify-between p-4">
            <Link href="/" className="text-xl font-bold">
                Portfolio
            </Link>

            <button 
            id="btn06"
            className={`btn-trigger ${open ? "active" : ""}`}
            onClick={() => setOpen(!open)}
            >
                <span />
                <span />
                <span />
            </button>

            {open && (
              <nav className="absolute top-16 right-4 bg-white shadow p-4 rounded">
                <ul className="space-y-2">
                    <li><Link href="/">Skills</Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                    <li><Link href="/login">Login</Link></li>
                </ul>
              </nav>  
            )}
        </header>
    );
}