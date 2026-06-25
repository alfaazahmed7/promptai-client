import React from 'react';
import Link from 'next/link';
import { getPromptsByEmail } from '@/lib/api/prompts';
import { getUserSession } from '@/lib/core/session';
import {
    FiUser,
    FiMail,
    FiShield,
    FiTerminal,
    FiLayers,
    FiZap,
    FiCheckCircle,
    FiArrowRight
} from 'react-icons/fi';

const UserProfilePage = async () => {
    // 1. Fetch data on the Server
    const sessionUser = await getUserSession();
    const prompts = await getPromptsByEmail(sessionUser?.email) || [];

    // Fallback Mocking User metadata structure using your example fields
    const user = {
        name: sessionUser?.name || "Alfaaz Ahmed",
        email: sessionUser?.email || "alfaazahmed011@gmail.com",
        image: sessionUser?.image || "https://i.ibb.co.com/LGyXMrq/michel-lee-3.webp",
        plan: sessionUser?.plan || "free", // "free" or "premium"
        role: sessionUser?.role || "user",
    };

    const totalPrompts = prompts.length;
    const isPremium = user.plan.toLowerCase() === 'premium';

    return (
        <div className="min-h-screen max-w-7xl mx-auto bg-[#0b0f19] text-slate-100 p-4 sm:p-6 lg:p-8">

            {/* Header Section */}
            <div className="mb-8 pb-6 border-b border-slate-800/50">
                <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
                    Account Profile
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Manage your personal account settings and premium subscription status.
                </p>
            </div>

            {/* Profile Grid System */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                {/* Left Column: Avatar & Basic Meta Card */}
                <div className="bg-slate-900/20 border border-slate-800/60 rounded-xl p-6 flex flex-col items-center text-center">
                    <div className="relative group w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-slate-950 border-2 border-slate-800 p-1 mb-4">
                        <img
                            src={user.image}
                            alt={user.name}
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                    <h2 className="text-lg font-medium text-white tracking-tight">{user.name}</h2>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                        <FiMail className="size-3 text-slate-500" />
                        {user.email}
                    </p>

                    {/* Compact Stat pills */}
                    <div className="mt-6 w-full grid grid-cols-2 gap-2 pt-4 border-t border-slate-800/40">
                        <div className="bg-slate-900/40 border border-slate-800/60 rounded-lg p-2.5">
                            <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-medium">Prompts</span>
                            <span className="text-base font-semibold text-white mt-0.5 block">{totalPrompts}</span>
                        </div>
                        <div className="bg-slate-900/40 border border-slate-800/60 rounded-lg p-2.5">
                            <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-medium">Tier</span>
                            <span className={`text-xs font-semibold mt-1 block uppercase tracking-wide ${isPremium ? 'text-amber-400' : 'text-slate-400'}`}>
                                {user.plan}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right/Middle Column: Details & Plan Status Panels */}
                <div className="lg:col-span-2 flex flex-col gap-6">

                    {/* Information Form Fields Box */}
                    <div className="bg-slate-900/20 border border-slate-800/60 rounded-xl p-6">
                        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <FiUser className="text-violet-400" /> Account Details
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Name Field */}
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1.5">Full Name</label>
                                <div className="w-full bg-slate-900/40 border border-slate-800/80 rounded-lg px-3 py-2 text-sm text-slate-300 flex items-center gap-2">
                                    <FiUser className="text-slate-500 size-4" />
                                    <span>{user.name}</span>
                                </div>
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1.5">Email Address</label>
                                <div className="w-full bg-slate-900/40 border border-slate-800/80 rounded-lg px-3 py-2 text-sm text-slate-300 flex items-center gap-2 overflow-hidden">
                                    <FiMail className="text-slate-500 size-4 shrink-0" />
                                    <span className="truncate">{user.email}</span>
                                </div>
                            </div>

                            {/* Account Role Field */}
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1.5">Account Role</label>
                                <div className="w-full bg-slate-900/40 border border-slate-800/80 rounded-lg px-3 py-2 text-sm text-slate-300 flex items-center gap-2 capitalize">
                                    <FiShield className="text-slate-500 size-4" />
                                    <span>{user.role}</span>
                                </div>
                            </div>

                            {/* Total Prompts Created */}
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1.5">Total Contributions</label>
                                <div className="w-full bg-slate-900/40 border border-slate-800/80 rounded-lg px-3 py-2 text-sm text-slate-300 flex items-center gap-2">
                                    <FiTerminal className="text-slate-500 size-4" />
                                    <span>{totalPrompts} Prompts Created</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Subscription Tier Banner Card */}
                    {!isPremium ? (
                        /* FREE MODE UPGRADE BANNER */
                        <div className="relative overflow-hidden bg-gradient-to-br from-violet-950/40 via-indigo-950/20 to-slate-900/20 border border-violet-500/30 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                            {/* Subtle Glow Effect background decoration */}
                            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

                            <div className="flex gap-4 items-start">
                                <div className="p-3 bg-violet-500/10 border border-violet-500/20 text-violet-400 rounded-xl shrink-0">
                                    <FiLayers size={22} />
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold text-white tracking-tight flex items-center gap-2">
                                        Free Account
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md leading-relaxed">
                                        Unlock limitless access to premium engineering blueprints, hidden templates, and advanced developer logic.
                                    </p>
                                </div>
                            </div>

                            {/* Upgrade Redirect Button */}
                            <Link
                                href="/pricing"
                                className="px-4 py-2.5 text-xs font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-lg transition-all shadow-lg shadow-indigo-950/50 shrink-0 flex items-center justify-center gap-1.5 group active:scale-[0.98]"
                            >
                                <span>Upgrade to Premium</span>
                                <FiZap size={14} className="text-amber-300 fill-amber-300" />
                                <FiArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                            </Link>
                        </div>
                    ) : (
                        /* PREMIUM MODE ACTIVE BANNER */
                        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-950/20 via-slate-900/20 to-slate-900/20 border border-emerald-500/20 rounded-xl p-6 flex items-center gap-4">
                            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl shrink-0">
                                <FiCheckCircle size={22} />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-white tracking-tight flex items-center gap-2">
                                    Premium Subscriber Active
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-lg leading-relaxed">
                                    Thank you for supporting our creative community! Your access to extreme tier templates and production systems is unlocked.
                                </p>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;