"use client";

import { BASE_API_URL } from "@/global";
import { storeCookie } from "@/utils/cookie";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

interface ResponseLogin {
  status: boolean;
  message: string;
  token?: string;
  user: {
    role: string;
  };
}

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const url = `${BASE_API_URL}/auth/login`;

      const response = await axios.post(
        url,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data: ResponseLogin = response.data;

      console.log("LOGIN RESPONSE:", data);

      if (data.status === true) {
        const role = data.user.role;

        // Simpan token dan role
        storeCookie("token", data.token || "");
        storeCookie("role", role || "");

        if (role === "admin") {
          toast.success(data.message, {
            containerId: "toastLogin",
            autoClose: 1000,
          });

          setTimeout(() => {
            router.replace("/admin/dashboard");
          }, 1000);

          return;
        }

        if (role === "user") {
          toast.warning("Anda bukan admin", {
            containerId: "toastLogin",
            autoClose: 2000,
          });

          return;
        }
      }

      toast.warning(data.message || "Login gagal", {
        containerId: "toastLogin",
      });
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      toast.error("Email atau password salah", {
        containerId: "toastLogin",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <ToastContainer containerId="toastLogin" />

      <div className="w-3/6 rounded-3xl bg-white p-8 shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-black">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2 block text-black">
              Email
            </label>

            <input
              className="w-full rounded-full border border-gray-300 p-2 text-black"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-black">
              Password
            </label>

            <input
              className="w-full rounded-full border border-gray-300 p-2 text-black"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            className="w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
            type="submit"
          >
            Login
          </button>

          <p className="mt-4 text-center text-gray-600">
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="text-blue-500 hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
        <div className="mb-5 mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
  <p className="font-semibold">Test Account</p>

  <p className="mt-1">
    Email: <span className="font-mono">prima@gmail.com</span>
  </p>

  <p>
    Password: <span className="font-mono">123</span>
  </p>
</div>
      </div>
    </div>
  );
}