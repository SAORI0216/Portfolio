import Link from "next/link";

const contacts = [
  {
    id:1,
    name:"田中太郎",
    email:"tanaka@mail.com",
    status:"unhandled",
    createdAt:"2026/1/20",
  },
  {
    id:2,
    name:"山田花子",
    email:"hanako@mail.com",
    status:"done",
    createdAt:"2026/1/18",
  },
];
const statusLabel = {
  unhandled:"未対応",
  handling:"対応中",
  done:"対応済み",
};
const statusColor = {
  unhandled:"bg-red-500 text-red-700",
  handling:"bg-yellow-500 text-yellow-700",
  done:"bg-green-500 text-green-700",
}

export default function ContactsPage() {
  return(
    <div>
      <h1 className="text-2xl font-semibold mb-6">Contacts</h1>
      <div className="overflow-hidden rounded-xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-[#1c1c1a]">
            <tr>
              <th className="px-4 py-3 text-left">名前</th>
              <th className="px-4 py-3 text-left">アドレス</th>
              <th className="px-4 py-3 text-left">状態</th>
              <th className="px-4 py-3 text-left">日時</th>
              <th className="px-4 py-3 text-left">操作</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) =>(
              <tr key={contact.id}className="border-t hover:bg-gray-50 transition">
                <td className="px-4 py-3">{contact.name}</td>
                <td className="px-4 py-3">{contact.email}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium${statusColor[contact.status as keyof typeof statusColor]}`}
                  >
                  <span className="h-2 w-2 rounded-full bg-current" />
                   {statusLabel[contact.status as keyof typeof statusLabel]}
                  </span>
                </td>
                <td className="px-4 py-3">{contact.createdAt}</td>
                <td className="px-4 py-3"><Link href={`/admin/dashboard/contacts/${contact.id}`}className="text-[#cb8967] hover:underLine">詳細</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
