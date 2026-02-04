import Link from "next/link";

export default function AdminDashbordPage() {
  //⭐仮データ（あとで差し替え）
  const inquiry = {
    pending:3,
    completed:12,
  };
  const profile = {
    isPublished:true,
  };
  const works = {
    total:8,
    withImage:6,
  };

  return (
    <div className="space-y-8">
    {/* タイトル */}
      <h1 className="text-2xl font-bold mb-4">
        Dashboard
      </h1>
    {/* カード一覧 */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* お問い合わせ */}
      <Link
      href="/admin/dashboard/contacts"
      className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-lg hover:-tranclate-y-1 hover:border-[#cb8967]">
        <h2 className="text-lg font-medium text-[#1c1c1a]">
          お問い合わせ
        </h2>
        <div className="mt-4 space-y-1 text-sm text-[#1c1c1a]">
          <p>未対応：<span className="font-semibold text-red-500">{inquiry.pending}</span>件</p>
          <p>対応済：<span className="font-semibold">{inquiry.completed}</span>件</p>
        </div>
      </Link>
      {/* プロフィール */}
      <Link
      href="/admin/dashbord/profile"
      className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-lg hover:-tranclate-y-1 hover:border-[#cb8967]"
      >
        <h2 className="text-lg font-medium text-[#1c1c1a]">
          プロフィール
        </h2>
        <p className="mt-4 text-sm text-[#1c1c1a]">
          公開状態：
          <span className={`ml-2 font-semibold ${profile.isPublished ? "text-green-600" : "text-gray-400"}`}>{profile.isPublished ? "公開中" : "非公開"}</span>
        </p>
      </Link>
      {/* 実績 */}
      <Link
      href="/admin/dashboard/works"
      className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-lg hover:-tranclate-y-1 hover:border-[#cb8967]">
        <h2 className="text-lg font-medium text-[#1c1c1a]">
          実績（Works）
        </h2>
        <div className="mt-4 space-y-1 text-sm text-[#1c1c1a]">
          <p>登録数：<span className="font-semibold">{works.total}</span>件</p>
          <p>画像あり：<span className="font-semibold">{works.withImage}</span>件</p>
        </div>
      </Link>
    </div>
  </div>
  );
}
