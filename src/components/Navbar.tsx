import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import {  Home } from "lucide-react";
import ShoppingCartIcon from "./ShoppingCartIcon";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between border-b border-gray-200 bg-[#2F4970] rounded-full px-10 py-2">
      {/* LEFT */}
      <Link href="/" className="flex items-center">
        <Image
          src="/martin-mumo.png"
          alt="Martin Mumo Signature Logo"
          width={200}
          height={100}
          className=" "
        />
        <p className="hidden md:block text-md font-medium tracking-wider">

        </p>
      </Link>
      {/* RIGHT */}
      <div className="flex items-center gap-6">
        <SearchBar />
        <Link href="/">
          <Home className="w-4 h-4 text-white"/>
        </Link>
        {/* <Bell className="w-4 h-4 text-white"/> */}
        <ShoppingCartIcon/>
        {/* <Link href="/login" className="text-white">Account</Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
