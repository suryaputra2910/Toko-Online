import { BASE_API_URL } from "@/global";
import { getServerCookie } from "@/lib/server-cookie";
import axios from "axios";

export const GetUser = async () => {
  try {
    const token = await getServerCookie("token");

    const response = await axios.get(
      `${BASE_API_URL}/admin/getuser`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return {
      status: true,
      message: "Users fetched successfully",
      data: response.data.user,
    };
  } catch (error) {
    console.error("GetUser Error:", error);

    return {
      status: false,
      message: "Failed to fetch users",
      data: [],
    };
  }
};
