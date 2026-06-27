"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiGithub, FiTwitter, FiLinkedin, FiArrowRight, FiGlobe, FiHeart } from "react-icons/fi";
import { FaFireFlameCurved } from "react-icons/fa6";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        marketplace: [
            { name: "Discover Prompts", href: "/prompts" },
            { name: "Premium Prompts", href: "/premium" },
            { name: "Free Resources", href: "/free" },
            { name: "Become a Seller", href: "/sell" },
        ],
        aiModels: [
            { name: "Midjourney Prompts", href: "/model/midjourney" },
            { name: "ChatGPT Prompts", href: "/model/chatgpt" },
            { name: "Claude AI Prompts", href: "/model/claude" },
            { name: "Stable Diffusion", href: "/model/stable-diffusion" },
        ],
        company: [
            { name: "About Us", href: "/about" },
            { name: "Pricing Plans", href: "/pricing" },
            { name: "Affiliate Program", href: "/affiliate" },
            { name: "Careers", href: "/careers" },
        ],
        legal: [
            { name: "Privacy Policy", href: "/privacy" },
            { name: "Terms of Service", href: "/terms" },
            { name: "License Agreement", href: "/license" },
            { name: "Refund Policy", href: "/refund" },
        ]
    };

    const socialLinks = [
        { icon: <FiTwitter className="w-5 h-5" />, href: "#", label: "Twitter" },
        { icon: <FiLinkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
        { icon: <FiGithub className="w-5 h-5" />, href: "#", label: "GitHub" },
        { icon: <FiGlobe className="w-5 h-5" />, href: "#", label: "Website" },
    ];

    return (
        /* Changed background to deep premium dark #0B0F17 and adjusted borders */
        <footer className="relative bg-[#0B0F17] border-t border-slate-900 overflow-hidden pt-20 pb-10">

            <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Upper Section: Brand + Newsletter + Links Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 pb-16">

                    {/* Brand Meta Block */}
                    <div className="lg:col-span-2 space-y-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="text-2xl font-semibold text-white tracking-wide">
                                Prompt<span className="text-[#dc2f02] font-extrabold">AI</span>
                            </div>
                        </Link>
                        <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                            The definitive marketplace to trade, find, and engineer premium optimized generative AI prompts. Level up your AI production stack.
                        </p>

                        {/* Modern Newsletter Input */}
                        <div className="space-y-3 pt-2">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Get Fresh Prompts Weekly
                            </h4>
                            <form className="relative max-w-sm flex items-center bg-white/[0.03] border border-slate-800 p-1 rounded-xl focus-within:border-indigo-500/60 transition-colors">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-transparent border-none outline-none text-white placeholder-slate-600 text-sm py-2 px-3 focus:ring-0"
                                    required
                                />
                                <button className="p-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors">
                                    <FiArrowRight className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Columns 1-4 Link Mapping */}
                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider mb-5">Marketplace</h3>
                        <ul className="space-y-3 font-medium">
                            {footerLinks.marketplace.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider mb-5">AI Platforms</h3>
                        <ul className="space-y-3 font-medium">
                            {footerLinks.aiModels.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider mb-5">Company</h3>
                        <ul className="space-y-3 font-medium">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider mb-5">Legal</h3>
                        <ul className="space-y-3 font-medium">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* Divider Line */}
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

                {/* Bottom Section: Copyright + Social Media */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10">

                    {/* Copyright & Signoff */}
                    <div className="text-xs text-slate-500 flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-center sm:text-left">
                        <span>&copy; {currentYear} PromptAI Corp. All rights reserved.</span>
                        <span className="hidden sm:inline text-slate-800">|</span>
                        <span className="flex items-center gap-1">
                            Built with <FiHeart className="text-[#e5383b] fill-[#e5383b] w-3 h-3" /> for AI Engineers.
                        </span>
                    </div>

                    {/* Social Network Platforms Link Block */}
                    <div className="flex items-center gap-3">
                        {socialLinks.map((social, idx) => (
                            <motion.a
                                key={idx}
                                href={social.href}
                                aria-label={social.label}
                                whileHover={{ y: -3, scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900/50 hover:bg-indigo-600/10 text-slate-400 hover:text-indigo-400 border border-slate-800/80 hover:border-indigo-500/30 transition-colors duration-200"
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </div>

                </div>

            </div>
        </footer>
    );
};

export default Footer;