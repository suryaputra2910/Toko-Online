'use client';
import { BASE_API_URL } from '@/global';
import { storeCookie } from "@/lib/client-cookies";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
export interface responseLogin {
  status: boolean
  token: string
  message: string
  user: User
}

export interface User {
  id: number
  nama_user: string
  email: string
  role: string
}


const LoginPage = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const router = useRouter()

    const handleSubmit = async (e: FormEvent) => {
       try {   
           e.preventDefault()
           const url = `${BASE_API_URL}/auth/login`
           const payload = JSON.stringify({ email, password })
           console.log(payload);
           const response = await axios.post(url,payload, {
               headers: {
                 "Content-Type": "application/json",
            }, 
           
           })
           const data: responseLogin = response.data
           if (data.status == true) {              
               const role = data.user.role
               if (role === `admin`) {
                 toast(data.message, { hideProgressBar: true, containerId: `toastLogin`, type: "success", autoClose: 2000 })
                 storeCookie("token", data?.token||'')
                 storeCookie("role", data?.user.role||'')
               setTimeout(() => router.replace(`/`),1000)
               }
               
               else if(role === `user`) {
                toast('anda bukan admin ', {hideProgressBar: true, containerId:`toastLogin`, type:"warning", autoClose: 2000})
                storeCookie("token", data?.token||'')
                storeCookie("role", data?.user.role||'')
                setTimeout(() => router.replace(`/`),1000)
               }
           }
           
           else toast(data.message, { hideProgressBar: true, containerId: `toastLogin`, type: "warning" })
       } catch (error) {
           console.log(error);
           toast(`Something wrong`, { hideProgressBar: true, containerId: `toastLogin`, type: "error" })
       }
   }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
         <ToastContainer containerId={`toastLogin`} />
        <div className="w-3/6 p-8 bg-white rounded-3xl shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-black">Admin Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-black mb-2" htmlFor="email">Email</label>
                    <input className="w-full p-2 border rounded-full text-black border-gray-300 rounded" type="email" id="email" name="email" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-6">
                    <label className="block text-black mb-2" htmlFor="password">Password</label>
                    <input className="w-full p-2 border rounded-full text-black border-gray-300 rounded" type="password" id="password" name="password" onChange={e => setPassword(e.target.value)} />
                </div>
                <div>
                    
                    <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" type="submit">Login</button>
                <p className="mt-4 text-center text-gray-600">Already haven't an account? 
                    <Link href="register" className="text-blue-500 hover:underline">Register here</Link>
                </p>
                </div>
            </form>
        </div>
    </div>
  )
};


export default LoginPage;