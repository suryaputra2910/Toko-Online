import { GetUser } from "@/lib/user";
import { User } from "@/types/user";

const UserPage = async () => {
  const result = await GetUser();

  const users: User[] = result.data ?? [];

  return (
    <div className="min-h-screen bg-[#09090b] p-6 text-white md:p-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Kelola User
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Kelola semua user yang terdaftar di sistem.
          </p>
        </div>

        {/* Total User */}
        <div className="mb-6 w-fit rounded-2xl border border-zinc-800 bg-zinc-900/60 px-6 py-4">
          <p className="text-sm text-zinc-500">
            Total User
          </p>

          <p className="mt-1 text-2xl font-bold">
            {users.length}
          </p>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60">

          <div className="overflow-x-auto">
            <table className="w-full">

              <thead className="border-b border-zinc-800 bg-zinc-900">
                <tr className="text-left">

                  <th className="px-6 py-4 text-sm text-zinc-400">
                    No
                  </th>

                  <th className="px-6 py-4 text-sm text-zinc-400">
                    Name
                  </th>

                  <th className="px-6 py-4 text-sm text-zinc-400">
                    Email
                  </th>

                  <th className="px-6 py-4 text-sm text-zinc-400">
                    Role
                  </th>

                  <th className="px-6 py-4 text-sm text-zinc-400">
                    Status
                  </th>

                  <th className="px-6 py-4 text-sm text-zinc-400">
                    Registered
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-800">

                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    className="transition hover:bg-zinc-800/40"
                  >

                    <td className="px-6 py-4 text-sm text-zinc-500">
                      {index + 1}
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-medium text-white">
                        {user.name}
                      </div>

                      <div className="text-xs text-zinc-600">
                        ID: {user.id}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-zinc-400">
                      {user.email}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          user.role === "admin"
                            ? "bg-violet-500/10 text-violet-400"
                            : user.role === "kasir"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-zinc-800 text-zinc-400"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {user.email_verified_at ? (
                        <span className="text-xs text-emerald-400">
                          Verified
                        </span>
                      ) : (
                        <span className="text-xs text-zinc-500">
                          Not Verified
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-sm text-zinc-500">
                      {new Date(user.created_at).toLocaleDateString(
                        "id-ID",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </td>

                  </tr>
                ))}

              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="p-10 text-center text-zinc-500">
              Tidak ada user ditemukan.
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default UserPage;
