import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="mt-16 flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between md:gap-0 bg-gray-800 p-8 rounded-lg">
      <div className="flex flex-col gap-4 items-center md:items-start">
        <Link href="/" className="flex items-center justify-between gap-2">
          <Image
            src="/mountain.png"
            alt="Martin Mumo Logo"
            width={36}
            height={36}
          />
          <p className="hidden md:block text-md font-medium tracking-wider text-white">
            MARTIN MUMO
          </p>
        </Link>
        <p className="text-sm text-gray-400">© 2025 Martin Mumo.</p>
        <p className="text-sm text-gray-400">All rights reserved.</p>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Links</p>
        <Link href="https://www.martinmumo.co.ke">Main Website</Link>{" "}
        <Link href="/">Shop</Link>
        {/* <Link href="/">Terms of Service</Link>
        <Link href="/">Privacy Policy</Link> */}
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Links</p>
        <Link href="/">All Products</Link>
        <Link href="/">Book</Link>
        {/* <Link href="/">Best Sellers</Link>
        <Link href="/">Sale</Link> */}
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Links</p>
        {/* <Link href="/">About</Link> */}
        {/* <Link href="https://martinmumo.co.ke/contact">Contact</Link> */}
        <Link href="/terms-and-conditions">Terms & Conditions</Link>
        <Link href="#">Privacy Policy</Link>
      </div>
    </div>
  );
};

export default Footer;
