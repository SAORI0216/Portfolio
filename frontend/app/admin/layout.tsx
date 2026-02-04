import { ReactNode } from "react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white p-6 gap-6">
       {/* サイドバー */}
       <aside className="w-[220px] h-[60vh] bg-[#f4e7d7] text-gray-800 rounded-2xl p-4 flex flex-col">
        <div className="px-2 py-4 text-xl font-semibold tracking-wide">
          管理者メニュー
        </div>
        {/* 区切り線 */}
        <div className="mx-2 border-t border-dashed border-gray-500/60"></div>

        <nav className="mt-6 flex flex-col gap-1 px-4">
          <Link
            href="/admin/dashboard"
            className="rounded px-3 py-2 hover:bg-[#cb8967]"
          >
           Dashboard
          </Link>
          <Link
            href="/admin/dashboard/profile"
            className="rounded px-3 py-2 hover:bg-[#cb8967]"
          >
           Profile
          </Link>
          <Link
            href="/admin/dashboard/works"
            className="rounded px-3 py-2 hover:bg-[#cb8967]"
          >
           Works
          </Link>
          <Link
            href="/admin/dashboard/contacts"
            className="rounded px-3 py-2 hover:bg-[#cb8967]"
          >
           Contacts
          </Link>
          <Link
            href="/admin/dashboard/settings"
            className="rounded px-3 py-2 hover:bg-[#cb8967]"
          >
           Settings
          </Link>
          <Link
            href="/"
            className="rounded px-3 py-2 hover:bg-[#cb8967]"
          >
           Logout
          </Link>
        </nav>
       </aside>
       {/* メインコンテンツ */}
       <main className="flex-1 bg-white p-8">
        {children}
       </main>
    </div>
  );
}
