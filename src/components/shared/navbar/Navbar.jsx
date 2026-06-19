"use client";
import logoIcon from '@/assets/logo.png';
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import NavLink from "./NavLink";
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import toast from "react-hot-toast";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
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
        { name: "All Prompts", href: "/all-prompts" },
        { name: "Pricing", href: "/pricing" },
    ];

    // Determine the true background state
    const useTransparentNavbar = isHome && !isScrolled;

    const userData = authClient.useSession();
    const user = userData.data?.user;
    const isPending = userData.isPending;

    const handleSignOut = async () => {
        await authClient.signOut();
        toast.success('You have successfully sign out');
    }

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
                        {isPending ? (
                            <span className="loading loading-spinner loading-md text-white"></span>
                        ) : user ? (
                            <div className="flex items-center gap-3">
                                <div className="avatar flex">
                                    <div className="w-10 h-10 rounded-full ring-2 ring-primary/20 overflow-hidden relative">
                                        {user?.image ? (
                                            <Image
                                                src={user.image}
                                                alt={user.name ?? "User avatar"}
                                                width={40}
                                                height={40}
                                                className="object-cover"
                                                referrerPolicy="no-referrer"
                                            />
                                        ) : (
                                            <div className="bg-neutral text-neutral-content flex h-full w-full items-center justify-center font-semibold">
                                                <span>{user?.name?.charAt(0) ?? "U"}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={handleSignOut}
                                    className="bg-slate-700 text-white px-6 py-2 rounded-lg border-b-4 border-slate-800 transition-all duration-200 hover:brightness-110 hover:-translate-y-[1px] active:border-b-2 active:translate-y-[2px] cursor-pointer text-sm font-medium"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/sign-in"
                                className="relative overflow-hidden rounded-md border border-b-4 border-[#3a86ff] bg-slate-950 px-4 py-2 font-semibold text-[#3a86ff] outline-none duration-300 group hover:border-b hover:border-t-4 hover:brightness-150 active:opacity-75"
                            >
                                <span className="absolute -top-[150%] left-0 inline-flex h-[5px] w-80 rounded-md bg-[#3a86ff] opacity-50 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)] shadow-[#3a86ff] duration-500 group-hover:top-[150%]"></span>
                                Login
                            </Link>
                        )}
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

                    <div className="pt-2">
                        {isPending ? (
                            <span className="loading loading-spinner loading-md text-white"></span>
                        ) : user ? (
                            <div className="flex items-center gap-3">
                                {/* FIX 2: Modified classes to show avatar clearly inside mobile layouts */}
                                <div className="avatar flex">
                                    <div className="w-10 h-10 rounded-full ring-2 ring-primary/20 overflow-hidden relative">
                                        {user?.image ? (
                                            <Image
                                                src={user.image}
                                                alt={user.name ?? "User avatar"}
                                                width={40}
                                                height={40}
                                                className="object-cover"
                                                referrerPolicy="no-referrer"
                                            />
                                        ) : (
                                            <div className="bg-neutral text-neutral-content flex h-full w-full items-center justify-center font-semibold">
                                                <span>{user?.name?.charAt(0) ?? "U"}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        handleSignOut();
                                    }}
                                    className="bg-slate-700 text-white px-6 py-2 rounded-lg border-b-4 border-slate-800 transition-all duration-200 hover:brightness-110 hover:-translate-y-[1px] active:border-b-2 active:translate-y-[2px] cursor-pointer text-sm font-medium"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <div onClick={() => setIsOpen(false)}>
                                <Link
                                    href="/sign-in"
                                    className="relative overflow-hidden rounded-md border border-b-4 border-[#3a86ff] bg-slate-950 px-4 py-2 font-semibold text-[#3a86ff] outline-none duration-300 group hover:border-b hover:border-t-4 hover:brightness-150 active:opacity-75 inline-block w-full text-center"
                                >
                                    Login
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;