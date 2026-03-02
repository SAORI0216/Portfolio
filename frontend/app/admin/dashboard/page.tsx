import Link from "next/link";

async function getDashboardData() {
  const [contactsRes,worksRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacts`,{cache:"no-store"}),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/works`,{cache:"no-store"}),
  ]);
  const contacts = await contactsRes.json();
  const works = await worksRes.json();

  return {contacts,works};
};

export default async function AdminDashbordPage() {
  const {contacts,works} = await getDashboardData();
  const totalContacts = contacts.length;
  const totalWorks = works.length;

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
          Contacts
        </h2>
        <div className="mt-4 space-y-1 text-sm text-[#1c1c1a]">
          <p>合計：<span className="font-semibold ">{totalContacts}</span>  件</p>
        </div>
      </Link>
      {/* 実績 */}
      <Link
      href="/admin/dashboard/works"
      className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-lg hover:-tranclate-y-1 hover:border-[#cb8967]">
        <h2 className="text-lg font-medium text-[#1c1c1a]">
          Works
        </h2>
        <div className="mt-4 space-y-1 text-sm text-[#1c1c1a]">
          <p>登録数：<span className="font-semibold">{totalWorks}</span>  件</p>
        </div>
      </Link>
    </div>
  </div>
  );
}
