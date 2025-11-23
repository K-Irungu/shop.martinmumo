"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ShoppingCartIcon from "./ShoppingCartIcon";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Variants ---
// Professional & Smooth Variants (No bounce)
const menuOverlayVariants = {
  hidden: {
    x: "100%",
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const menuLinkVariants = {
  hidden: { 
    opacity: 0, 
    y: 10 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1, 
      ease: "easeOut", 
    },
  },
};

// --- Nav Link Component ---
// Updates: Removed text bounce, added smooth CSS underline on hover
const NavLink = ({
  href,
  children,
  isMobile = false,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  isMobile?: boolean;
  onClick?: () => void;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href} 
      onClick={onClick} 
      className="relative group inline-block"
    >
      {/* TEXT - Static, no scaling/bouncing */}
      <span
        className={`block relative z-10 ${
          isMobile
            ? "text-2xl font-bold text-white"
            : "text-sm font-medium text-white"
        }`}
      >
        {children}
      </span>

      {/* UNDERLINE - CSS Transition
          Logic: 
          1. If active: width is full (w-full)
          2. If not active: width is 0 (w-0), but becomes full on hover (group-hover:w-full)
      */}
      <span
        className={`absolute left-0 bg-white transition-[width] duration-300 ease-out
          ${isMobile ? "-bottom-2 h-[3px]" : "-bottom-1 h-[2px]"}
          ${isActive ? "w-full" : "w-0 group-hover:w-full"}
        `}
      />
    </Link>
  );
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => {
      document.body.style.overflow = !prev ? "hidden" : "auto";
      return !prev;
    });
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "auto";
  }, []);

  return (
    <>
      <nav className="relative w-full flex items-center justify-between border-b border-gray-200 bg-[#2F4970] rounded-full px-6 md:px-10 py-3 z-50">
        {/* LEFT - Logo */}
        <Link href="/" className="flex items-center shrink-0 z-50">
          <Image
            src="/martin-mumo.png"
            alt="Martin Mumo Signature Logo"
            width={150}
            height={75}
            className="w-[120px] md:w-[200px] h-auto"
          />
        </Link>

        {/* RIGHT - Desktop Nav & Cart */}
        <div className="flex items-center gap-4 md:gap-6 w-full justify-end">
          {/* Desktop Links */}
          <div className="hidden lg:flex justify-between gap-10 mr-10">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/terms-and-conditions">Terms & Conditions</NavLink>
            <NavLink href="/privacy-policy">Privacy Policy</NavLink>
          </div>

          {/* Shopping Cart */}
          <div className="hidden lg:flex z-50">
            <ShoppingCartIcon />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            type="button"
            className="inline-flex items-center text-white rounded-lg lg:hidden hover:text-gray-200 transition-colors z-50"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="w-8 h-8" />
            ) : (
              <Menu className="w-8 h-8" />
            )}
          </button>
        </div>
      </nav>

      {/* --- Mobile Menu Overlay --- */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <motion.div
            className="fixed top-0 left-0 w-full h-screen bg-[#2F4970] lg:hidden z-40 p-8 flex flex-col justify-center"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuOverlayVariants}
          >
            <motion.ul className="flex flex-col space-y-8 text-center items-center">
              <motion.li variants={menuLinkVariants}>
                <NavLink href="/" isMobile onClick={closeMobileMenu}>
                  Home
                </NavLink>
              </motion.li>

              <motion.li variants={menuLinkVariants}>
                <NavLink
                  href="/terms-and-conditions"
                  isMobile
                  onClick={closeMobileMenu}
                >
                  Terms & Conditions
                </NavLink>
              </motion.li>

              <motion.li variants={menuLinkVariants}>
                <NavLink
                  href="/privacy-policy"
                  isMobile
                  onClick={closeMobileMenu}
                >
                  Privacy Policy
                </NavLink>
              </motion.li>

              {/* --- Cart Item in Menu --- */}
              <motion.li
                variants={menuLinkVariants}
                className="pt-6 mt-4 border-t border-gray-500/50 w-full flex justify-center"
              >
                <div onClick={closeMobileMenu}>
                  <ShoppingCartIcon />
                </div>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;