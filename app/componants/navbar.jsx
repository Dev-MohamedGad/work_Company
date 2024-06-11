"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import img from "../../public/Logo.png";
import ContextProvider, { MyContext } from "../context/Context";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { token } = useContext(MyContext);
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  function handleLogout() {
    setIsLogin(false);
    router.replace("/login");
  }

  return (
    <ContextProvider>
      <div className="bg-blue-400 flex justify-between pl-10 mx-auto w-full items-center">
        <Image
          alt="logo"
          height={200}
          width={200}
          objectFit="contain"
          src={img}
        />
        {token && isLogin && ( // Check if token exists and isLogin is true
          <button
            className="bg-white rounded-full p-3 text-xl text-blue-400"
            onClick={handleLogout}
          >
            تسجيل الخروج
          </button>
        )}
      </div>
    </ContextProvider>
  );
}
