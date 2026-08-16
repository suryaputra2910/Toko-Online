'use client';

import { useRouter } from 'next/navigation';
import axios from "axios";
import { BASE_API_URL } from "@/global";
import { getCookie } from "cookies-next";

type Props = {
    id: number;
};

const DropBarangButton = ({ id }: Props) => {
    const router = useRouter();

    const handleDelete = async () => {
        console.log("DELETE CLICKED", id);

        if (!id) {
            alert("ID tidak ditemukan");
            return;
        }

        const confirmDelete = window.confirm("Yakin hapus barang ini?");
        if (!confirmDelete) return;

        try {
            const token = getCookie("token");

            await axios.delete(
                `${BASE_API_URL}/admin/hapusbarang/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Berhasil hapus");
            router.refresh();

        } catch (err: any) {
            console.log("ERROR DELETE:", err.response?.data || err.message);
            alert("Gagal hapus");
        }
    };

    return (
        <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
            Drop
        </button>
    );
};

export default DropBarangButton;