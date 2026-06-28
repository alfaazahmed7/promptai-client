"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const SignIn = () => {
    // 1. Form Data State
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // 2. Field Errors State
    const [errors, setErrors] = useState({});

    // 3. Password Visibility State
    const [showPassword, setShowPassword] = useState(false);

    // Handle input field changes dynamically
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear field error instantly when user types
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    // Client-side form validation handler
    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = "Email address is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const { data, error } = await authClient.signIn.email({
                email: formData.email,
                password: formData.password,
            });

            if (data) {
                toast.success("Successfully signed in!");
                redirect("/");
            }
            if (error) {
                toast.error("Authentication failed: " + error.message);
            }
        }
    };

    // Google Sign In Handler
    const handleGoogleSignIn = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (err) {
            toast.error("Unable to start Google sign in.");
        }
    };

    return (
        <main className="min-h-screen w-full flex items-center justify-center bg-[#011627] relative overflow-hidden pt-20 pb-12 px-4">

            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none hidden md:block" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-96 h-96 bg-[#dc2f02]/10 rounded-full blur-[120px] pointer-events-none hidden md:block" />

            {/* Entrance Animation Wrapper */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-6 rounded-2xl shadow-2xl relative z-10"
            >
                {/* Header Branding Section */}
                <div className="text-center space-y-1 mb-5">
                    <Link href="/" className="text-xl font-bold text-white tracking-wide inline-block">
                        Prompt<span className="text-[#dc2f02] font-extrabold">AI</span>
                    </Link>
                    <h2 className="text-lg font-bold text-white">Welcome Back</h2>
                    <p className="text-xs text-slate-400">Sign in to manage your premium engineering deck</p>
                </div>

                {/* Form Elements */}
                <form onSubmit={handleSubmit} className="space-y-3.5">

                    {/* Email Input Field */}
                    <div className="form-control w-full">
                        <label className="py-0.5">
                            <span className="text-slate-300 text-[10px] font-semibold uppercase tracking-wider">Email Address</span>
                        </label>
                        <div className={`flex items-center bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-slate-700/50'} focus-within:border-indigo-500/60 p-0.5 rounded-lg transition-colors`}>
                            <FiMail className="w-3.5 h-3.5 ml-3 text-slate-400 flex-shrink-0" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="name@company.com"
                                className="w-full bg-transparent border-none outline-none text-white text-xs py-1.5 px-2.5 focus:ring-0"
                            />
                        </div>
                        {errors.email && <p className="text-[11px] text-red-400 mt-1 ml-1">{errors.email}</p>}
                    </div>

                    {/* Password Input Field with Toggle Functionality */}
                    <div className="form-control w-full">
                        <div className="flex justify-between items-center py-0.5">
                            <span className="text-slate-300 text-[10px] font-semibold uppercase tracking-wider">Password</span>
                            <Link href="/forgot-password" className="text-[11px] text-indigo-400 hover:text-indigo-300 hover:underline transition-colors">
                                Forgot password?
                            </Link>
                        </div>
                        <div className={`flex items-center bg-white/5 border ${errors.password ? 'border-red-500/50' : 'border-slate-700/50'} focus-within:border-indigo-500/60 p-0.5 rounded-lg transition-colors`}>
                            <FiLock className="w-3.5 h-3.5 ml-3 text-slate-400 flex-shrink-0" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full bg-transparent border-none outline-none text-white text-xs py-1.5 px-2.5 focus:ring-0"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="p-1.5 mr-1 text-slate-400 hover:text-white rounded-md transition-colors focus:outline-none"
                            >
                                {showPassword ? <FiEyeOff className="w-3.5 h-3.5" /> : <FiEye className="w-3.5 h-3.5" />}
                            </button>
                        </div>
                        {errors.password && <p className="text-[11px] text-red-400 mt-1 ml-1">{errors.password}</p>}
                    </div>

                    {/* Submit Registration Button */}
                    <button
                        type="submit"
                        className="btn bg-indigo-600 hover:bg-indigo-500 border-none text-white w-full rounded-lg py-2.5 mt-2 font-medium flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/10 transition-all active:scale-[0.98] normal-case text-xs"
                    >
                        Sign In
                        <FiArrowRight className="w-3.5 h-3.5" />
                    </button>
                </form>

                {/* Decorative Visual Divider */}
                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-slate-800/80"></div>
                    <span className="mx-3 text-[10px] text-slate-500 uppercase tracking-widest font-semibold">or</span>
                    <div className="flex-grow border-t border-slate-800/80"></div>
                </div>

                {/* Google Sign In Button */}
                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/50 text-white rounded-lg py-2.5 text-xs font-medium flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] shadow-md shadow-black/5 cursor-pointer"
                >
                    <FcGoogle className="w-4 h-4 flex-shrink-0" />
                    <span>Continue with Google</span>
                </button>

                {/* Footer Redirection Layer */}
                <div className="text-center pt-4 mt-4 border-t border-slate-800/60">
                    <p className="text-xs text-slate-400">
                        Do not have an account yet?{" "}
                        <Link href="/sign-up" className="text-indigo-400 hover:text-indigo-300 font-medium hover:underline transition-colors">
                            Sign Up
                        </Link>
                    </p>
                </div>

            </motion.div>
        </main>
    );
};

export default SignIn;