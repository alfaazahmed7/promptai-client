"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiCheck, FiX, FiLock, FiShield, FiZap, FiArrowRight, FiInfo } from "react-icons/fi";
import toast from "react-hot-toast";

const PricingPage = () => {
    const [loading, setLoading] = useState(false);

    // Placeholder function for Stripe Checkout integration
    const handleCheckout = async () => {
        setLoading(true);
        try {
            // Replace this fetch endpoint with your actual Next.js route handler
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ priceId: "stripe_price_id_here" }),
            });

            const data = await response.json();

            if (data.url) {
                // Redirect user to Stripe Checkout page
                window.location.href = data.url;
            } else {
                throw new Error(data.message || "Something went wrong");
            }
        } catch (error) {
            toast.error(error.message || "Failed to initiate checkout. Please try again.");
            setLoading(false);
        }
    };

    const freeFeatures = [
        "Access to basic AI model generations",
        "Standard community forum access",
        "View community member profiles",
        "Standard response times",
    ];

    const premiumFeatures = [
        "Unlimited Advanced AI Model prompt generations",
        "Unlock full Creator & Admin networks",
        "Priority 24/7 engineering support",
        "Exclusive early access to Prompts updates",
        "Verified 'Premium' badge on your profile",
        "Ad-free premium platform experience",
    ];

    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center bg-[#011627] relative overflow-hidden pt-36 pb-16 px-4">

            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none hidden md:block" />
            <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 w-[500px] h-[500px] bg-[#dc2f02]/10 rounded-full blur-[140px] pointer-events-none hidden md:block" />

            {/* Header Section */}
            <div className="text-center max-w-2xl mx-auto mb-16 relative z-10 space-y-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-medium uppercase tracking-wider mb-2"
                >
                    <FiZap className="w-3.5 h-3.5" /> Premium Route
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white"
                >
                    Upgrade Your Experience
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-400 text-base sm:text-lg max-w-lg mx-auto"
                >
                    Unlock life-time access to advanced tools, elite creator networks, and enterprise tools on PromptAI.
                </motion.p>
            </div>

            {/* Pricing Cards Container */}
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch relative z-10 px-2 sm:px-6">

                {/* Free Plan Card */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-slate-900/30 backdrop-blur-xl border border-slate-800/80 p-8 rounded-3xl flex flex-col justify-between shadow-xl"
                >
                    <div>
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-slate-300">Starter Plan</h3>
                            <p className="text-sm text-slate-500 mt-1">Explore basic utilities and standard networking tools.</p>
                        </div>
                        <div className="flex items-baseline text-white mb-8">
                            <span className="text-5xl font-extrabold tracking-tight">$0</span>
                            <span className="ml-1 text-sm font-semibold text-slate-500">/ forever</span>
                        </div>

                        <div className="space-y-4 border-t border-slate-800/60 pt-6">
                            <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">What is Included:</p>
                            <ul className="space-y-3">
                                {freeFeatures.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-slate-400 text-sm">
                                        <FiCheck className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                                <li className="flex items-start gap-3 text-slate-600 text-sm line-through">
                                    <FiX className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                                    <span>Advanced AI Tools</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-800/40">
                        <button
                            disabled
                            className="w-full bg-slate-800/50 border border-slate-700/50 text-slate-400 rounded-xl py-3 text-sm font-medium transition-all cursor-not-allowed text-center"
                        >
                            Your Current Plan
                        </button>
                    </div>
                </motion.div>

                {/* Premium Plan Card (Highlighted) */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-gradient-to-b from-slate-900/80 to-slate-900/40 backdrop-blur-xl border-2 border-indigo-500 p-8 rounded-3xl flex flex-col justify-between shadow-2xl shadow-indigo-600/5 relative"
                >
                    {/* Popular / Premium Badge */}
                    <span className="absolute -top-3.5 right-6 bg-gradient-to-r from-indigo-600 to-[#dc2f02] text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide shadow-md uppercase">
                        Highly Recommended
                    </span>

                    <div>
                        <div className="mb-6">
                            <div className="flex items-center gap-2">
                                <h3 className="text-xl font-bold text-white">Premium Access</h3>
                                <div className="badge badge-sm bg-indigo-500/20 border-indigo-500/40 text-indigo-400 px-2 py-2 text-[10px] font-bold">LIFETIME</div>
                            </div>
                            <p className="text-sm text-slate-400 mt-1">Supercharge your prompt building workflow today.</p>
                        </div>
                        <div className="flex items-baseline text-white mb-8">
                            <span className="text-5xl font-extrabold tracking-tight">$5</span>
                            <span className="ml-2 text-sm font-semibold text-slate-400">/ one-time payment</span>
                        </div>

                        <div className="space-y-4 border-t border-slate-800 pt-6">
                            <p className="text-xs uppercase tracking-wider text-indigo-400 font-bold">Unlocks Everything:</p>
                            <ul className="space-y-3">
                                {premiumFeatures.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-slate-200 text-sm">
                                        <FiCheck className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-800">
                        <button
                            onClick={handleCheckout}
                            disabled={loading}
                            className="btn bg-indigo-600 hover:bg-indigo-500 border-none text-white w-full rounded-xl py-3 font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98] normal-case"
                        >
                            {loading ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                                <>
                                    Pay Safely via Stripe
                                    <FiArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>

                        {/* Security guarantees */}
                        <div className="flex items-center justify-center gap-4 mt-4 text-[11px] text-slate-500 font-medium">
                            <span className="flex items-center gap-1"><FiLock className="w-3 h-3 text-indigo-500/70" /> 256-bit Encrypted</span>
                            <span className="flex items-center gap-1"><FiShield className="w-3 h-3 text-indigo-500/70" /> Stripe Verified</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Additional Info / Trust Section */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12 text-center max-w-md mx-auto px-4 text-slate-500 text-xs flex items-start gap-2.5 bg-slate-900/20 border border-slate-800/40 p-4 rounded-2xl relative z-10"
            >
                <FiInfo className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <p className="text-left leading-relaxed">
                    This is a secure layout prepared to link directly into your Stripe instance. Payments are processed securely via Stripe Elements infrastructure; your sensitive data never impacts our servers.
                </p>
            </motion.div>
        </main>
    );
};

export default PricingPage;