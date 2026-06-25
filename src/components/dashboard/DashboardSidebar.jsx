"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    FiPlusCircle,
    FiGrid,
    FiBookmark,
    FiStar,
    FiUser,
    FiChevronLeft,
    FiChevronRight
} from 'react-icons/fi';
import { CiViewTimeline } from 'react-icons/ci';
import {
    FiUsers,
    FiCreditCard,
    FiAlertTriangle,
    FiBarChart2
} from "react-icons/fi";
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';

const DashboardSidebar = ({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) => {
    const pathname = usePathname();

    const userNavlinks = [
        { name: 'Overview', href: '/dashboard/user', icon: CiViewTimeline },
        { name: 'Add Prompt', href: '/dashboard/user/add-prompt', icon: FiPlusCircle },
        { name: 'My Prompts', href: '/dashboard/user/my-prompts', icon: FiGrid },
        { name: 'Saved Prompts', href: '/dashboard/user/saved-prompts', icon: FiBookmark },
        { name: 'My Reviews', href: '/dashboard/user/my-reviews', icon: FiStar },
        { name: 'Profile', href: '/dashboard/user/profile', icon: FiUser },
    ];

    const creatorNavlinks = [
        { name: 'Analytics', href: '/dashboard/creator/analytics', icon: CiViewTimeline },
        { name: 'Add Prompt', href: '/dashboard/creator/add-prompt', icon: FiPlusCircle },
        { name: 'My Prompts', href: '/dashboard/creator/my-prompts', icon: FiGrid },
    ];

    const adminNavlinks = [
        { name: 'All Users', href: '/dashboard/admin/users', icon: FiUsers },
        { name: 'All Prompts', href: '/dashboard/admin/prompts', icon: FiGrid },
        { name: 'All Payments', href: '/dashboard/admin/payments', icon: FiCreditCard },
        { name: 'Reported Prompts', href: '/dashboard/admin/reported-prompts', icon: FiAlertTriangle },
        { name: 'Analytics', href: '/dashboard/admin/analytics', icon: FiBarChart2 },
    ];

    const navLinkMap = {
        user: userNavlinks,
        creator: creatorNavlinks,
        admin: adminNavlinks
    }

    const userData = authClient.useSession();
    const user = userData.data?.user;

    const navItems = navLinkMap[user?.role || 'user'];
    const isActive = (href) => pathname === href;

    return (
        <>
            {/* Mobile dark background overlay backdrop shroud */}
            {isMobileOpen && (
                <div
                    onClick={() => setIsMobileOpen(false)}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 lg:sticky lg:top-0 h-screen border-r border-slate-800 bg-[#0f1422] text-slate-200 transition-all duration-300 ease-in-out z-50 flex flex-col justify-between ${isCollapsed ? 'lg:w-20' : 'lg:w-64'
                    } w-64 ${isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                {/* Desktop Collapse Trigger Button */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="hidden lg:flex absolute -right-3 top-7 w-6 h-6 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer shadow-md"
                >
                    {isCollapsed ? <FiChevronRight size={14} /> : <FiChevronLeft size={14} />}
                </button>

                <div>
                    {/* Branding / Header */}
                    <div className={`h-20 border-b border-slate-800/60 flex items-center px-5 ${isCollapsed ? 'lg:justify-center' : 'justify-between'}`}>
                        <Link
                            href="/"
                            className="text-2xl font-semibold text-white tracking-wide"
                        >
                            {isCollapsed ? (
                                <span className="lg:hidden">
                                    Prompt<span className="text-[#dc2f02] font-extrabold">AI</span>
                                </span>
                            ) : (
                                <span>
                                    Prompt<span className="text-[#dc2f02] font-extrabold">AI</span>
                                </span>
                            )}

                            {isCollapsed && (
                                <span className="hidden lg:inline">
                                    P
                                </span>
                            )}
                        </Link>
                        <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 ${isCollapsed ? 'lg:hidden' : ''}`}>
                            {user?.role || 'User'}
                        </span>
                    </div>

                    {/* Main Menu Links */}
                    <ul className="px-3 py-6 space-y-1.5 list-none">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.href);
                            return (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsMobileOpen(false)} // Closes screen-shade menu on select
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-150 group spatial-link ${active
                                            ? 'bg-gradient-to-r from-teal-500/15 to-emerald-500/5 text-teal-400 border border-teal-500/20'
                                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
                                            } ${isCollapsed ? 'lg:justify-center' : ''}`}
                                        title={isCollapsed ? item.name : ''}
                                    >
                                        <Icon className={`text-lg shrink-0 ${active ? 'text-teal-400' : 'text-slate-400 group-hover:text-slate-300'}`} />
                                        <span className={isCollapsed ? 'lg:hidden truncate' : 'truncate'}>{item.name}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Bottom Profile Identity Section */}
                <div className="p-3 border-t border-slate-800/60 bg-slate-900/30">
                    <div className={`flex items-center gap-3 px-2 py-1.5 rounded-xl border border-slate-800/40 bg-slate-900/50 ${isCollapsed ? 'lg:justify-center' : ''}`}>
                        <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 relative">
                            <Image
                                src={user?.image}
                                alt={user?.name || "User"}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className={`flex-1 min-w-0 ${isCollapsed ? 'lg:hidden' : ''}`}>
                            <h4 className="text-sm font-semibold text-slate-200 truncate leading-tight">{user?.name}</h4>
                            <p className="text-xs text-slate-500 truncate">
                                {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)} Account
                            </p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default DashboardSidebar;