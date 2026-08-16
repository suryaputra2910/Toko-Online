import { URL_IMAGE } from "@/global";
import { GetBarang } from "@/services/barang";
import FormBarang from "./formbarang";

const BarangPage = async () => {
    const { data } = await GetBarang();

    return (
        <div className="text-black p-6">


            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">
                    Barang
                </h1>


                <FormBarang
                    label="Tambah Barang"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow"
                />
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                {data?.map((item: any) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                    >


                        <div className="w-full h-48 bg-gray-200 overflow-hidden">
                            <img
                                src={`${URL_IMAGE}/${item.image}`}
                                alt={item.nama_barang}
                                className="w-full h-full object-cover hover:scale-105 transition-transform"
                            />
                        </div>


                        <div className="p-4">


                            <h3 className="text-lg font-semibold mb-2 truncate">
                                {item.nama_barang}
                            </h3>


                            <div className="space-y-2 mb-4">

                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Harga:</span>
                                    <span className="font-bold text-green-600">
                                        Rp {item.harga.toLocaleString("id-ID")}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Stok:</span>
                                    <span className={`font-semibold ${item.stok > 0 ? "text-green-600" : "text-red-600"
                                        }`}>
                                        {item.stok} unit
                                    </span>
                                </div>

                            </div>


                            <div className="flex gap-5 mt-3 items-center justify-center">


                                <div className="flex-1">
                                    <FormBarang
                                        label="Edit"
                                        id={item.id}
                                        formData={item}
                                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded text-center block"
                                    />
                                </div>


                                <div className="flex-1">
                                    <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded">
                                        Hapus
                                    </button>
                                </div>

                            </div>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
};

export default BarangPage;