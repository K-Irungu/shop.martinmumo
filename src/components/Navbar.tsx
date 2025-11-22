"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import ShoppingCartIcon from "./ShoppingCartIcon";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Reuse variants from the reference code
const menuOverlayVariants = {
  hidden: {
    x: "100%",
    transition: {
      ease: "easeInOut",
      duration: 0.5,
  } as const,
  },
  visible: {
    x: 0,
    transition: {
      ease: "easeInOut",
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  } as const,
};

const menuLinkVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  } as const,
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggles the mobile menu state and controls body scroll
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => {
      document.body.style.overflow = !prev ? "hidden" : "auto";
      return !prev;
    });
  }, []);

  // Closes the mobile menu and restores body scroll
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
          <p className="hidden md:block text-md font-medium tracking-wider"></p>
        </Link>

        {/* RIGHT - Desktop Nav & Cart */}
        <div className="flex items-center gap-4 md:gap-6 w-full justify-end">
          {/* Desktop Links - Hidden on Mobile/Tablet, Visible on Large screens */}
          <div className="hidden lg:flex justify-between gap-10 mr-10">
            <Link href="/" className="text-white hover:text-gray-200 transition-colors">
              Home
            </Link>
            <Link href="/terms-and-conditions" className="text-white hover:text-gray-200 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/privacy-policy" className="text-white hover:text-gray-200 transition-colors">
              Privacy Policy
            </Link>
          </div>

          {/* Shopping Cart - Always visible in header */}
          <div className="z-50">
             <ShoppingCartIcon />
          </div>

          {/* Mobile Menu Toggle Button - Visible on Mobile/Tablet, Hidden on Large screens */}
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
            {/* Mobile Links List */}
            <motion.ul className="flex flex-col space-y-6 text-center">
              <motion.li variants={menuLinkVariants}>
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className="text-2xl font-bold text-white hover:text-gray-300 block"
                >
                  Home
                </Link>
              </motion.li>
              
              <motion.li variants={menuLinkVariants}>
                <Link
                  href="/terms-and-conditions"
                  onClick={closeMobileMenu}
                  className="text-2xl font-bold text-white hover:text-gray-300 block"
                >
                  Terms & Conditions
                </Link>
              </motion.li>
              
              <motion.li variants={menuLinkVariants}>
                <Link
                  href="/privacy-policy"
                  onClick={closeMobileMenu}
                  className="text-2xl font-bold text-white hover:text-gray-300 block"
                >
                  Privacy Policy
                </Link>
              </motion.li>

              {/* --- Cart Item in Menu --- */}
              <motion.li 
                variants={menuLinkVariants}
                className="pt-6 mt-4 border-t border-gray-500/50 flex justify-center items-center gap-4"
              >
                {/* <span className="text-2xl font-medium text-gray-200">Your Cart</span> */}
                <div onClick={closeMobileMenu} >
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