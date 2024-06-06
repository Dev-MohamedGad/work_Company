"use client";
import Image from "next/image";
import React, { useContext } from "react";
import img from "../../public/Logo.png";
import ContextProvider, { MyContext } from "../context/Context";
import Link from "next/link";
export default function Navbar() {
  let context = useContext(MyContext);

  return (
    <ContextProvider> <div className=" bg-blue-400 flex justify-between pl-10 mx-auto w-full items-center">
    <Image
      alt="logo"
      height={200}
      width={200}
      objectFit="contain"
      src={img}
    ></Image>{" "}
  </div></ContextProvider>
   
  );
}
