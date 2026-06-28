"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLink, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

const SignUp = () => {
    // 1. Form Data State (Added role and plan)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        photoURL: "",
        password: "",
        role: "user", // Default option
        plan: "free", // Initially free
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

        if (!formData.name.trim()) newErrors.name = "Full name is required";

        if (!formData.email.trim()) {
            newErrors.email = "Email address is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.photoURL.trim()) {
            newErrors.photoURL = "Photo URL is required";
        } else if (!/^https?:\/\/.+/i.test(formData.photoURL)) {
            newErrors.photoURL = "Please enter a valid image URL";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        }
        else if (formData.password.length < 6) {
            newErrors.password = "Must be at least 6 characters";
        }
        else if (!/[A-Z]/.test(formData.password)) {
            newErrors.password = "Requires an uppercase letter";
        }
        else if (!/[0-9]/.test(formData.password)) {
            newErrors.password = "Requires a number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const { data, error } = await authClient.signUp.email({
                name: formData.name,
                email: formData.email,
                image: formData.photoURL,
                password: formData.password,
                role: formData.role,
                plan: formData.plan,
            });

            if (data) {
                toast.success(`You have successfully registered to NeoMotors`);
                redirect('/sign-in');
            }
            if (error) {
                toast.error('Error signing up: ' + error.message);
            }
        }
    };

    // Google Sign Up Handler
    const handleGoogleSignUp = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (error) {
            toast.error("Google registration failed");
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
                    <h2 className="text-lg font-bold text-white">Create your account</h2>
                    <p className="text-xs text-slate-400">Join the ultimate AI engineer network</p>
                </div>

                {/* Form Elements */}
                <form onSubmit={handleSubmit} className="space-y-3.5">

                    {/* Name Input Field */}
                    <div className="form-control w-full">
                        <label className="py-0.5">
                            <span className="text-slate-300 text-[10px] font-semibold uppercase tracking-wider">Full Name</span>
                        </label>
                        <div className={`flex items-center bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-slate-700/50'} focus-within:border-indigo-500/60 p-0.5 rounded-lg transition-colors`}>
                            <FiUser className="w-3.5 h-3.5 ml-3 text-slate-400 flex-shrink-0" />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="w-full bg-transparent border-none outline-none text-white text-xs py-1.5 px-2.5 focus:ring-0"
                            />
                        </div>
                        {errors.name && <p className="text-[11px] text-red-400 mt-1 ml-1">{errors.name}</p>}
                    </div>

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

                    {/* Photo URL Input Field */}
                    <div className="form-control w-full">
                        <label className="py-0.5">
                            <span className="text-slate-300 text-[10px] font-semibold uppercase tracking-wider">Photo URL</span>
                        </label>
                        <div className={`flex items-center bg-white/5 border ${errors.photoURL ? 'border-red-500/50' : 'border-slate-700/50'} focus-within:border-indigo-500/60 p-0.5 rounded-lg transition-colors`}>
                            <FiLink className="w-3.5 h-3.5 ml-3 text-slate-400 flex-shrink-0" />
                            <input
                                type="text"
                                name="photoURL"
                                value={formData.photoURL}
                                onChange={handleChange}
                                placeholder="https://example.com/avatar.jpg"
                                className="w-full bg-transparent border-none outline-none text-white text-xs py-1.5 px-2.5 focus:ring-0"
                            />
                        </div>
                        {errors.photoURL && <p className="text-[11px] text-red-400 mt-1 ml-1">{errors.photoURL}</p>}
                    </div>

                    {/* Account Type Radio Selector */}
                    <div className="form-control w-full">
                        <label className="py-0.5">
                            <span className="text-slate-300 text-[10px] font-semibold uppercase tracking-wider">Account Type</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {["user", "creator"].map((role) => (
                                <label
                                    key={role}
                                    className={`flex flex-col items-center justify-center p-2 rounded-lg border text-center cursor-pointer transition-all ${formData.role === role
                                        ? "bg-indigo-600/10 border-indigo-500 text-indigo-400 font-medium"
                                        : "bg-white/5 border-slate-700/50 text-slate-400 hover:border-slate-600"
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="role"
                                        value={role}
                                        checked={formData.role === role}
                                        onChange={handleChange}
                                        className="sr-only"
                                    />
                                    <span className="capitalize text-xs">{role}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Password Input Field with Toggle Functionality */}
                    <div className="form-control w-full">
                        <label className="py-0.5">
                            <span className="text-slate-300 text-[10px] font-semibold uppercase tracking-wider">Password</span>
                        </label>
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
                        Create Account
                        <FiArrowRight className="w-3.5 h-3.5" />
                    </button>
                </form>

                {/* Decorative Visual Divider */}
                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-slate-800/80"></div>
                    <span className="mx-3 text-[10px] text-slate-500 uppercase tracking-widest font-semibold">or</span>
                    <div className="flex-grow border-t border-slate-800/80"></div>
                </div>

                {/* Google Sign In/Up Button */}
                <button
                    type="button"
                    onClick={handleGoogleSignUp}
                    className="w-full bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/50 text-white rounded-lg py-2.5 text-xs font-medium flex items-center justify-center gap-2.5 transition-all active:scale-[0.98]"
                >
                    <FcGoogle className="w-4 h-4 flex-shrink-0" />
                    <span>Sign up with Google</span>
                </button>

                {/* Footer Redirection Layer */}
                <div className="text-center pt-4 mt-4 border-t border-slate-800/60">
                    <p className="text-xs text-slate-400">
                        Already have an account?{" "}
                        <Link href="/sign-in" className="text-indigo-400 hover:text-indigo-300 font-medium hover:underline transition-colors">
                            Sign In
                        </Link>
                    </p>
                </div>

            </motion.div>
        </main>
    );
};

export default SignUp;