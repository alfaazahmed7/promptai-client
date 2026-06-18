"use client";
import logoIcon from '@/assets/logo.png';
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import NavLink from "./NavLink";
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === '/';

    // Track scroll position to toggle the background color dynamically
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const brand = { name: "Prompt", highlight: "AI", href: "/" };

    const centerLinks = [
        { name: "Home", href: "/" },
        { name: "All Prompts", href: "/prompts" },
        { name: "Pricing", href: "/pricing" },
    ];

    // Determine the true background state
    // It stays transparent ONLY on the home page AND when the user hasn't scrolled down yet.
    const useTransparentNavbar = isHome && !isScrolled;

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${useTransparentNavbar
                    ? "bg-transparent shadow-none"
                    : "bg-[#1A2536] backdrop-blur-md shadow-lg"
                }`}
        >
            <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* 1. Left Side: Logo & Brand Name */}
                    <Link href={brand.href} className="flex items-center flex-shrink-0">
                        <Image
                            src={logoIcon}
                            alt="logo"
                            width={60}
                            height={60}
                            className="bg-transparent"
                        />
                        <div className="text-2xl ml-2">
                            <p className="text-white font-semibold">
                                {brand.name}<span className="text-[#dc2f02] font-extrabold">{brand.highlight}</span>
                            </p>
                        </div>
                    </Link>

                    {/* 2. Middle: Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-6">
                        {centerLinks.map((link) => (
                            <NavLink key={link.href} href={link.href}>
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    {/* 3. Right Side: Unique Standalone Login Link */}
                    <div className="hidden md:flex items-center">
                        <Link
                            href="/login"
                            className="relative overflow-hidden rounded-md border border-b-4 border-[#3a86ff] bg-slate-950 px-4 py-2 font-medium text-[#3a86ff] outline-none duration-300 group hover:border-b hover:border-t-4 hover:brightness-150 active:opacity-75"
                        >
                            <span className="absolute -top-[150%] left-0 inline-flex h-[5px] w-80 rounded-md bg-[#3a86ff] opacity-50 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)] shadow-[#3a86ff] duration-500 group-hover:top-[150%]"></span>
                            Login
                        </Link>
                    </div>

                    {/* 4. Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
                        >
                            {isOpen ? <HiX className="h-6 w-6" /> : <HiMenuAlt3 className="h-6 w-6" />}
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? "block" : "hidden"}`}>
                <div className="px-4 pt-2 pb-4 space-y-3 bg-slate-900 flex flex-col">
                    {centerLinks.map((link) => (
                        <div key={link.href} onClick={() => setIsOpen(false)}>
                            <NavLink href={link.href}>{link.name}</NavLink>
                        </div>
                    ))}

                    <div className="pt-2" onClick={() => setIsOpen(false)}>
                        <Link
                            href="/login"
                            className="block text-center text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-md transition-colors duration-200"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;