import { URL_IMAGE } from "@/global";
import { GetBarang } from "@/services/barang";
import FormBarang from "./formbarang";

const BarangPage = async () => {
  const { data } = await GetBarang();

  return (
    <div className="min-h-screen bg-[#09090b] p-6 text-white md:p-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Kelola Barang
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              Kelola produk, harga, dan stok barang di toko.
            </p>
          </div>

          <FormBarang
            label="+ Tambah Barang"
            className="w-full rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/10 transition hover:bg-indigo-500 sm:w-auto"
          />
        </div>

        {/* Summary */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* Total Barang */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Total Barang
            </p>

            <div className="mt-2 flex items-end justify-between">
              <h2 className="text-3xl font-bold">
                {data?.length ?? 0}
              </h2>

              <div className="rounded-xl bg-indigo-500/10 px-3 py-2 text-lg">
                📦
              </div>
            </div>
          </div>

          {/* Barang Tersedia */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Barang Tersedia
            </p>

            <div className="mt-2 flex items-end justify-between">
              <h2 className="text-3xl font-bold text-emerald-400">
                {data?.filter((item: any) => item.stok > 0).length ?? 0}
              </h2>

              <div className="rounded-xl bg-emerald-500/10 px-3 py-2 text-lg">
                ✓
              </div>
            </div>
          </div>

          {/* Stok Habis */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Stok Habis
            </p>

            <div className="mt-2 flex items-end justify-between">
              <h2 className="text-3xl font-bold text-red-400">
                {data?.filter((item: any) => item.stok <= 0).length ?? 0}
              </h2>

              <div className="rounded-xl bg-red-500/10 px-3 py-2 text-lg">
                !
              </div>
            </div>
          </div>

        </div>

        {/* Product Grid */}
        {data && data.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {data.map((item: any) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70 shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900"
              >

                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-zinc-800">

                  <img
                    src={`${URL_IMAGE}/${item.image}`}
                    alt={item.nama_barang}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* Stock Badge */}
                  <div className="absolute right-3 top-3">
                    {item.stok > 0 ? (
                      <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400 backdrop-blur-md">
                        Stok tersedia
                      </span>
                    ) : (
                      <span className="rounded-full border border-red-400/20 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-400 backdrop-blur-md">
                        Stok habis
                      </span>
                    )}
                  </div>

                </div>

                {/* Content */}
                <div className="p-5">

                  <h3
                    className="truncate text-lg font-semibold text-white"
                    title={item.nama_barang}
                  >
                    {item.nama_barang}
                  </h3>

                  {/* Price */}
                  <div className="mt-4">
                    <p className="text-xs text-zinc-500">
                      Harga
                    </p>

                    <p className="mt-1 text-xl font-bold text-emerald-400">
                      Rp {Number(item.harga).toLocaleString("id-ID")}
                    </p>
                  </div>

                  {/* Stock */}
                  <div className="mt-4 flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3">
                    <span className="text-sm text-zinc-500">
                      Stok
                    </span>

                    <span
                      className={`text-sm font-semibold ${
                        item.stok > 0
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}
                    >
                      {item.stok} unit
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 grid grid-cols-2 gap-3">

                    <FormBarang
                      label="Edit"
                      id={item.id}
                      formData={item}
                      className="w-full rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2.5 text-sm font-semibold text-blue-400 transition hover:bg-blue-500 hover:text-white"
                    />

                    <button
                      className="w-full rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
                    >
                      Hapus
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        ) : (

          /* Empty State */
          <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 p-16 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-800 text-3xl">
              📦
            </div>

            <h2 className="mt-5 text-lg font-semibold">
              Belum ada barang
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-zinc-500">
              Belum ada produk yang terdaftar. Tambahkan barang pertama
              kamu untuk mulai mengelola produk.
            </p>

            <div className="mt-6 flex justify-center">
              <FormBarang
                label="+ Tambah Barang"
                className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
              />
            </div>

          </div>

        )}

      </div>
    </div>
  );
};

export default BarangPage;