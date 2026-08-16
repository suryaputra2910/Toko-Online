import { BASE_API_URL } from "@/global";
import { getServerCookie } from "@/lib/server-cookie";
import { Barang } from "@/types/barang";
import axios from "axios";
import Cookies from "js-cookie";

type ResponseData = {
    status: boolean;
    message: string;
    data?: any;
};

export const GetBarang = async (): Promise<ResponseData> => {

    try {
        const token = await getServerCookie("token");
        const response = await axios.get(
            `${BASE_API_URL}/admin/getbarang?page=1&quantity=10`,
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        );
        return {
            status: true,
            message: "Barang fetched successfully",
            data: response.data.data,
        };

    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: "Failed to fetch barang",
        };
    }
};

export const TambahBarang = async (
    formData: FormData
): Promise<ResponseData> => {

    try {
        const token = Cookies.get("token");
        const response = await axios.post(
            `${BASE_API_URL}/admin/insertbarang`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${token}`,
                },
            }
        );
        return {
            status: true,
            message: "Barang added successfully",
            data: response.data,
        };
    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: "Failed to add barang",
        };
    }
};

export const GetBarangById = async (id: number) => {

    try {

        const token = await getServerCookie("token");

        const response = await axios.get(
            `${BASE_API_URL}/admin/getbarang/${id}`,
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;

    } catch (error) {

        console.log(error);
    }
};

export const UpdateBarang = async (
    id: number,
    formData: FormData
) => {

    try {

        const token = Cookies.get("token");

        const response = await axios.put(
            `${BASE_API_URL}/admin/updatebarang/${id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;

    } catch (error) {

        console.log(error);
    }
};

export const DeleteBarang = async (id: number) => {

    try {

        const token = Cookies.get("token");

        const response = await axios.delete(
            `${BASE_API_URL}/admin/deletebarang/${id}`,
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;

    } catch (error) {

        console.log(error);
    }
};