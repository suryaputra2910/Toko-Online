import { BASE_API_URL } from "@/global";
import { getServerCookie } from "@/lib/server-cookie";
import axios from "axios";

export const GetUser = async () => {
  try {
    const token = await getServerCookie("token");

    if (!token) {
      return {
        status: false,
        message: "Unauthorized: token is missing",
        data: [],
      };
    }

    const response = await axios.get(`${BASE_API_URL}/admin/getuser`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    return {
      status: true,
      message: "Users fetched successfully",
      data: response.data?.user ?? response.data?.data ?? [],
    };
  } catch (error: any) {
    const status = error?.response?.status;
    const message =
      status === 401
        ? "Unauthorized: invalid or expired token"
        : "Failed to fetch users";

    console.error("GetUser Error:", error);

    return {
      status: false,
      message,
      data: [],
    };
  }
};