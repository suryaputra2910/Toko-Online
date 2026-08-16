import { GetUser } from "@/lib/user";
import { User } from "@/types/user";

export const dynamic = "force-dynamic";
const DashboardPage = async () => {
  const result = await GetUser();

  const users: User[] = result.data ?? [];

  const totalUsers = users.length;

  const totalAdmin = users.filter(
    (user) => user.role === "admin"
  ).length;

  const totalKasir = users.filter(
    (user) => user.role === "kasir"
  ).length;

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      description: "Registered users",
      icon: "👥",
    },
    {
      title: "Admin",
      value: totalAdmin,
      description: "Administrator accounts",
      icon: "🛡️",
    },
    {
      title: "Kasir",
      value: totalKasir,
      description: "Cashier accounts",
      icon: "💼",
    },
  ];

  const activities = [
    {
      title: "New user registered",
      time: "2 minutes ago",
      status: "New",
    },
    {
      title: "Payment received",
      time: "10 minutes ago",
      status: "Paid",
    },
    {
      title: "Server updated",
      time: "1 hour ago",
      status: "Update",
    },
  ];

  return (
    <div className="min-h-screen bg-black p-6 text-white">

      {/* Header */}
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-slate-400">
            Welcome back, Admin 👋
          </p>
        </div>
      </div>


      {/* Overview */}
      <section className="mb-10">

        <div className="mb-4">
          <h2 className="text-lg font-bold">
            Overview
          </h2>

          <p className="text-sm text-zinc-500">
            Current system statistics
          </p>
        </div>


        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {stats.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 transition duration-300 hover:-translate-y-1 hover:border-zinc-600"
            >
              <div className="flex items-start justify-between">

                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-500">
                    {item.title}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold">
                    {item.value}
                  </h2>

                  <p className="mt-2 text-xs text-zinc-600">
                    {item.description}
                  </p>
                </div>

                <div className="text-4xl">
                  {item.icon}
                </div>

              </div>
            </div>
          ))}

        </div>
      </section>


      {/* Recent Activity */}
      <div className="grid grid-cols-1 gap-6">

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

          <div className="mb-6 flex items-center justify-between">

            <div>
              <h2 className="text-2xl font-semibold">
                Recent Activity
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Latest system activity
              </p>
            </div>

            <button className="text-sm text-slate-400 transition hover:text-white">
              View All
            </button>

          </div>


          <div className="space-y-4">

            {activities.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-4 transition hover:border-zinc-700"
              >

                <div>
                  <h3 className="font-medium">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    {item.time}
                  </p>
                </div>

                <span className="rounded-full bg-white/10 px-4 py-1 text-sm text-white">
                  {item.status}
                </span>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default DashboardPage;