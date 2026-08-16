import {
  ArrowRight,
  BarChart3,
  Bell,
  Clock3,
  LayoutDashboard,
  Package,
  Users,
} from "lucide-react";
import Link from "next/link";
import { GetUser } from "@/lib/user";
import { User } from "@/types/user";

const navigation = [
  {
    title: "Dashboard",
    desc: "Overview & statistics",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    title: "Kelola User",
    desc: "Manage registered users",
    href: "/admin/user",
    icon: Users,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Kelola Barang",
    desc: "Manage your products",
    href: "/admin/barang",
    icon: Package,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
];

export default async function AdminDashboard() {
  // Ambil data user dari API
  const result = await GetUser();

  const users: User[] = result.data ?? [];

  // Ambil 5 user terbaru
  const recentUsers = [...users]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
    )
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-[#09090b] text-white">

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-250px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[130px]" />

        <div className="absolute bottom-[-200px] right-[-100px] h-[400px] w-[400px] rounded-full bg-blue-600/5 blur-[120px]" />
      </div>

      <main className="mx-auto max-w-7xl p-5 md:p-8 lg:p-10">

        {/* Header */}
        <header className="mb-8">

          <div className="mb-3 flex items-center gap-2 text-sm text-zinc-500">
            <LayoutDashboard size={16} />

            <span>Admin Panel</span>

            <span>/</span>

            <span className="text-zinc-300">
              Dashboard
            </span>
          </div>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Admin Dashboard
              </h1>

              <p className="mt-2 text-sm text-zinc-500 md:text-base">
                Welcome back, Admin 👋
              </p>
            </div>

            <button className="flex w-fit items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-800 hover:text-white">
              <Bell size={17} />
              Notifications
            </button>

          </div>
        </header>


        {/* Welcome Card */}
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 md:p-8">

          <div className="absolute right-[-80px] top-[-80px] h-56 w-56 rounded-full bg-violet-600/10 blur-3xl" />

          <div className="relative">

            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">

              <span className="h-2 w-2 rounded-full bg-emerald-400" />

              System Online

            </div>

            <h2 className="text-2xl font-bold md:text-3xl">
              Good evening
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
              Manage your users, products, and monitor your system
              activity from one place.
            </p>

          </div>
        </section>


        {/* Statistics */}
        <section className="mb-10">

          <div className="mb-4">
            <h2 className="text-lg font-bold">
              Overview
            </h2>

            <p className="text-sm text-zinc-500">
              Current system statistics
            </p>
          </div>


          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {/* Total Users */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition hover:border-zinc-700">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-500">
                    Total Users
                  </p>

                  <h3 className="mt-2 text-3xl font-bold">
                    {users.length}
                  </h3>

                  <p className="mt-2 text-xs text-zinc-600">
                    Registered users
                  </p>
                </div>

                <div className="rounded-xl bg-violet-500/10 p-3 text-violet-400">
                  <Users size={22} />
                </div>

              </div>
            </div>


            {/* Total Admin */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition hover:border-zinc-700">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-500">
                    Admin
                  </p>

                  <h3 className="mt-2 text-3xl font-bold">
                    {users.filter(
                      (user) => user.role === "admin"
                    ).length}
                  </h3>

                  <p className="mt-2 text-xs text-zinc-600">
                    Administrator accounts
                  </p>
                </div>

                <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
                  <Users size={22} />
                </div>

              </div>
            </div>


            {/* Total Kasir */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition hover:border-zinc-700">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-500">
                    Kasir
                  </p>

                  <h3 className="mt-2 text-3xl font-bold">
                    {users.filter(
                      (user) => user.role === "kasir"
                    ).length}
                  </h3>

                  <p className="mt-2 text-xs text-zinc-600">
                    Cashier accounts
                  </p>
                </div>

                <div className="rounded-xl bg-amber-500/10 p-3 text-amber-400">
                  <Users size={22} />
                </div>

              </div>
            </div>

          </div>
        </section>


        {/* Quick Navigation */}
        <section className="mb-10">

          <div className="mb-4">
            <h2 className="text-lg font-bold">
              Quick Navigation
            </h2>

            <p className="text-sm text-zinc-500">
              Quickly access your admin tools
            </p>
          </div>


          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            {navigation.map((item) => {

              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group"
                >

                  <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900 hover:shadow-xl hover:shadow-black/20">

                    <div className="absolute right-[-30px] top-[-30px] h-28 w-28 rounded-full bg-white/[0.02] blur-2xl transition group-hover:bg-white/[0.04]" />

                    <div className="relative flex items-start justify-between">

                      <div>
                        <h3 className="text-lg font-bold">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-sm text-zinc-500">
                          {item.desc}
                        </p>
                      </div>

                      <div
                        className={`rounded-xl p-3 ${item.bg} ${item.color}`}
                      >
                        <Icon size={23} />
                      </div>

                    </div>

                    <div className="relative mt-7 flex items-center gap-2 text-sm font-medium text-zinc-500 transition group-hover:text-white">

                      Open page

                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />

                    </div>

                  </div>

                </Link>
              );
            })}

          </div>
        </section>


        {/* Recent Users */}
        <section className="mb-10">

          <div className="mb-4">
            <h2 className="text-lg font-bold">
              Recent Users
            </h2>

            <p className="text-sm text-zinc-500">
              Recently registered users
            </p>
          </div>


          <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50">

            {recentUsers.map((user, index) => (

              <div
                key={user.id}
                className={`flex items-center gap-4 p-5 transition hover:bg-zinc-900 ${
                  index !== recentUsers.length - 1
                    ? "border-b border-zinc-800"
                    : ""
                }`}
              >

                {/* Avatar */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-sm font-bold text-emerald-400">
                  {user.name.charAt(0).toUpperCase()}
                </div>


                {/* User */}
                <div className="min-w-0 flex-1">

                  <h3 className="text-sm font-semibold">
                    {user.name}
                  </h3>

                  <p className="mt-1 truncate text-xs text-zinc-500">
                    {user.email}
                  </p>

                </div>


                {/* Role */}
                <span className="hidden rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400 sm:block">
                  {user.role}
                </span>


                {/* Date */}
                <div className="flex shrink-0 items-center gap-1.5 text-xs text-zinc-600">

                  <Clock3 size={13} />

                  {new Date(
                    user.created_at
                  ).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}

                </div>

              </div>

            ))}


            {recentUsers.length === 0 && (
              <div className="p-8 text-center text-sm text-zinc-500">
                Belum ada user.
              </div>
            )}

          </div>
        </section>


        {/* Footer */}
        <footer className="flex flex-col items-center justify-between gap-3 border-t border-zinc-800 pt-6 text-xs text-zinc-600 sm:flex-row">

          <p>
            Admin Panel © 2026
          </p>

          <div className="flex items-center gap-2">
            <BarChart3 size={14} />

            <span>
              System is running normally
            </span>
          </div>

        </footer>

      </main>
    </div>
  );
}
