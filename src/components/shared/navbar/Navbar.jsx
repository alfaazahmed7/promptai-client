"use client";
import logoIcon from '@/assets/logo.png';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import NavLink from "./NavLink";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "All Prompts", href: "/prompts" },
        { name: "Login", href: "/login" },
        { name: "Register", href: "/register" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#011627] backdrop-blur-md border-b border-slate-800 shadow-lg py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Flex Container handles justify-between correctly now */}
                <div className="flex items-center justify-between h-16">

                    {/* 1. Left Side: Logo */}
                    <Link href="/" className="flex items-center flex-shrink-0">
                        <Image
                            src={logoIcon}
                            alt="logo"
                            width={60}
                            height={60}
                            className="bg-transparent"
                        />

                        <div className="text-2xl">
                            <p className="text-white font-semibold">Prompt<span className="text-[#dc2f02] font-extrabold">AI</span></p>
                        </div>
                    </Link>

                    {/* 2. Desktop Navigation Links (Pushed to the right/center perfectly) */}
                    <div className="hidden md:flex items-center gap-4">
                        {navLinks.map((link) => (
                            <NavLink key={link.href} href={link.href}>
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    {/* 3. Mobile Menu Button (Only visible on small screens) */}
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
                <div className="px-4 pt-2 pb-4 space-y-3 bg-slate-900 border-b border-slate-800 flex flex-col">
                    {navLinks.map((link) => (
                        <div key={link.href} onClick={() => setIsOpen(false)}>
                            <NavLink href={link.href}>{link.name}</NavLink>
                        </div>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;