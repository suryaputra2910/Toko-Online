'use client';

import Modal from "@/components/modal";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BASE_API_URL, URL_IMAGE } from "@/global";
import { getCookie } from "cookies-next";

type Props = {
    id?: number;
    formData?: any;
    label?: string;
    className?: string;
};

const FormBarang = ({
    id,
    formData,
    label = "Tambah Barang",
    className = ""
}: Props) => {

    const [isOpen, setIsOpen] = useState(false);
    const [nama, setNama] = useState(formData?.nama_barang || "");
    const [deskripsi, setDeskripsi] = useState(formData?.deskripsi || "");
    const [harga, setHarga] = useState(formData?.harga || 0);
    const [stok, setStok] = useState(formData?.stok || 0);
    const [image, setImage] = useState<File | null>(null);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = getCookie("token");

        const data = new FormData();

        data.append("nama_barang", nama);
        data.append("deskripsi", deskripsi);
        data.append("harga", String(harga));
        data.append("stok", String(stok));

        if (image) {
            data.append("image", image);
        }

        if (id) {
            data.append("id", String(id));
        }

        try {
            if (id) {
                await axios.post(`${BASE_API_URL}/admin/updatebarang/${id}`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                })

                toast("Berhasil update", {
                    containerId: "barang",
                    type: "success",
                    autoClose: 20
                });
            } else {
                await axios.post(`${BASE_API_URL}/admin/insertbarang`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                });

                toast("Berhasil tambah", {
                    containerId: "barang",
                    type: "success",
                    autoClose: 20
                });
            }

            setIsOpen(false);
            setNama("");
            setDeskripsi("");
            setHarga(0);
            setStok(0);
            setImage(null);

            router.refresh();

        } catch (err: any) {
            toast(err?.response?.data?.message || "Gagal", {
                containerId: "barang",
                type: "error",
                autoClose: 20
            });
        }
    };

    return (
        <div>


            <button onClick={() => setIsOpen(true)} className={className}>
                {label}
            </button>

            <ToastContainer containerId="barang" />


            <Modal
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
    title={id ? "Edit Barang" : "Tambah Barang"}
>
    <form onSubmit={handleSubmit} className="space-y-4">

        {/* Nama Barang */}
        <div>
            <label className="mb-1 block text-sm font-medium text-black">
                Nama Barang
            </label>

            <input
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Masukkan nama barang"
                className="w-full rounded border p-2 text-black"
            />
        </div>

        {/* Deskripsi */}
        <div>
            <label className="mb-1 block text-sm font-medium text-black">
                Deskripsi
            </label>

            <input
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                placeholder="Masukkan deskripsi barang"
                className="w-full rounded border p-2 text-black"
            />
        </div>

        {/* Harga */}
        <div>
            <label className="mb-1 block text-sm font-medium text-black">
                Harga
            </label>

            <input
                value={harga}
                onChange={(e) => setHarga(Number(e.target.value))}
                type="number"
                min="0"
                placeholder="Masukkan harga barang"
                className="w-full rounded border p-2 text-black"
            />
        </div>

        {/* Stok */}
        <div>
            <label className="mb-1 block text-sm font-medium text-black">
                Stok
            </label>

            <input
                value={stok}
                onChange={(e) => setStok(Number(e.target.value))}
                type="number"
                min="0"
                placeholder="Masukkan jumlah stok"
                className="w-full rounded border p-2 text-black"
            />
        </div>

        {/* Preview gambar saat edit */}
        {formData?.image && !image && (
            <div>
                <label className="mb-1 block text-sm font-medium text-black">
                    Gambar Saat Ini
                </label>

                <img
                    src={`${URL_IMAGE}/${formData.image}`}
                    alt="Gambar barang"
                    className="h-24 w-24 rounded object-cover"
                />
            </div>
        )}

        {/* Upload gambar */}
        <div>
            <label className="mb-1 block text-sm font-medium text-black">
                Gambar Barang
            </label>

            <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                    setImage(
                        e.target.files ? e.target.files[0] : null
                    )
                }
                className="w-full rounded border p-2 text-black"
            />
        </div>

        {/* Button */}
        <div className="flex justify-end">
            <button
                type="submit"
                className="rounded bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
            >
                Save
            </button>
        </div>

    </form>
</Modal>

        </div>
    );
};

export default FormBarang;