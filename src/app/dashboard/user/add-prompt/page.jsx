"use client";
import { userAddPrompt } from '@/lib/actions/userAddPrompt';
import { getUserAddPrompts } from '@/lib/api/userAddPrompts';
import { authClient } from '@/lib/auth-client';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
    FiPlusCircle,
    FiImage,
    FiAlertTriangle,
    FiInfo,
    FiCheckCircle,
    FiLoader,
    FiCode,
    FiHelpCircle,
    FiEye,
    FiDollarSign,
    FiActivity
} from 'react-icons/fi';

const AddPromptPage = () => {

    const userData = authClient.useSession();
    const user = userData.data?.user || {};

    const [prompts, setPrompts] = useState([]);

    useEffect(() => {
        const fetchPrompts = async () => {
            if (!user?.email) return;

            const data = await getUserAddPrompts(user.email);
            setPrompts(data);
        };

        fetchPrompts();
    }, [user?.email]);

    const userAddedPromptsCount = prompts.length;

    // const userAddedPromptsCount = 0;
    const isLimitReached =
        user?.plan === "free" && userAddedPromptsCount >= 3;

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        aiTool: '',
        fullDescription: '',
        promptContent: '',
        usageInstructions: '',
        tags: [''],
        difficulty: 'Beginner',
        visibility: 'Public',
        tier: 'free'
    });

    const [imageFile, setImageFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });
    const [logoUrl, setLogoUrl] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]:
                name === "tags"
                    ? value.split(",").map(tag => tag.trim()).filter(Boolean)
                    : value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLimitReached) return;
        setIsSubmitting(true);
        setStatusMessage({ type: '', text: '' });

        try {
            let uploadedImageUrl = logoUrl;

            if (imageFile) {
                const imgData = new FormData();
                imgData.append("image", imageFile);

                const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;

                if (!IMGBB_API_KEY) {
                    throw new Error("ImgBB API key is missing from environment variables.");
                }

                const imgResponse = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                    method: "POST",
                    body: imgData
                });

                if (!imgResponse.ok) {
                    throw new Error(`Image upload failed with status ${imgResponse.status}`);
                }

                const imgResult = await imgResponse.json();

                if (imgResult && imgResult.success) {
                    uploadedImageUrl = imgResult.data.url;
                    setLogoUrl(uploadedImageUrl);
                } else {
                    throw new Error(imgResult.error?.message || "ImgBB upload was unsuccessful.");
                }
            }

            // Simulate database latency
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // submission
            const submissionData = {
                ...formData,
                logoUrl: uploadedImageUrl,
                status: 'pending',
                copyCount: 0,
                userEmail: user?.email,
                userId: user?.id,
                userRole: user?.role,
            };

            const res = await userAddPrompt(submissionData);
            if (res.insertedId) {
                setPrompts(prev => [...prev, submissionData]);
                toast.success('Prompt submitted successfully');
            }

            setStatusMessage({
                type: 'success',
                text: 'Prompt submitted successfully! Admin review pending.'
            });
        }
        catch (error) {
            console.error("Submission error details:", error);
            setStatusMessage({
                type: 'error',
                text: error.message || 'Something went wrong.'
            });
        }
        finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">

            {/* Elegant Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800/80 pb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-100 flex items-center gap-2.5">
                        <span className="p-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
                            <FiPlusCircle size={20} />
                        </span>
                        Create a New Prompt
                    </h1>
                    <p className="text-xs text-slate-400 mt-1.5">Publish your optimized prompt engineering instructions to the public marketplace global directory.</p>
                </div>

                {user?.plan === "free" && (
                    <div className={`px-4 py-3 rounded-xl border flex items-center gap-3 text-xs ${isLimitReached ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : 'bg-[#0f1422] border-slate-800 text-slate-300'
                        }`}>
                        <FiInfo size={16} className={isLimitReached ? 'text-rose-400' : 'text-teal-400'} />
                        <div>
                            <span className="block font-semibold">Free Workspace Cap</span>
                            <span className="text-slate-400 text-[11px]">Usage Allocation: <strong className="text-slate-200">{userAddedPromptsCount} / 3</strong> prompts created.</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Error Notification Shrouds */}
            {isLimitReached && (
                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 text-amber-400/90 flex gap-3 text-xs">
                    <FiAlertTriangle size={18} className="shrink-0 text-amber-500" />
                    <div>
                        <h4 className="font-semibold text-slate-200">Creation quota limit reached</h4>
                        <p className="text-slate-400 mt-0.5">Free accounts have a limit of 3 entries. Upgrade your plan level to access unlimited database allocations.</p>
                    </div>
                </div>
            )}

            {statusMessage.text && (
                <div className={`p-4 rounded-xl flex gap-3 text-xs border ${statusMessage.type === 'success' ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-400' : 'bg-rose-500/5 border-rose-500/10 text-rose-400'
                    }`}>
                    {statusMessage.type === 'success' ? <FiCheckCircle size={18} /> : <FiAlertTriangle size={18} />}
                    <span>{statusMessage.text}</span>
                </div>
            )}

            {/* Two Column Structured Workspace Layout */}
            <form onSubmit={handleSubmit} className={`grid grid-cols-1 lg:grid-cols-3 gap-8 items-start ${isLimitReached ? 'opacity-30 pointer-events-none select-none' : ''}`}>

                {/* Left Side: Main Comprehensive Form Inputs Card (Takes 2 Columns) */}
                <div className="lg:col-span-2 bg-[#0f1422] border border-slate-800/80 rounded-xl p-6 space-y-6 shadow-sm">

                    <div className="form-control w-full">
                        <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Prompt Title</label>
                        <input
                            type="text"
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g., SEO-Optimized Article Outline Generator"
                            className="w-full bg-[#0b0f19] border border-slate-800/80 rounded-lg text-slate-100 placeholder-slate-700 focus:border-teal-500/60 focus:ring-1 focus:ring-teal-500/20 focus:outline-none px-4 h-11 text-sm transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="form-control w-full">
                            <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Category</label>
                            <div className="relative">
                                <select
                                    name="category"
                                    required
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full bg-[#0b0f19] border border-slate-800/80 rounded-lg text-slate-200 focus:border-teal-500/60 focus:outline-none px-4 h-11 text-sm appearance-none cursor-pointer transition-all pr-10"
                                >
                                    <option value="" className="text-slate-600">Choose Category</option>
                                    <option value="Content Writing">Content Writing</option>
                                    <option value="SEO Strategy">SEO Strategy</option>
                                    <option value="Graphic Prompting">Graphic Prompting</option>
                                    <option value="Coding Assistant">Coding Assistant</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                        </div>

                        <div className="form-control w-full">
                            <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">AI Tool Model</label>
                            <div className="relative">
                                <select
                                    name="aiTool"
                                    required
                                    value={formData.aiTool}
                                    onChange={handleChange}
                                    className="w-full bg-[#0b0f19] border border-slate-800/80 rounded-lg text-slate-200 focus:border-teal-500/60 focus:outline-none px-4 h-11 text-sm appearance-none cursor-pointer transition-all pr-10"
                                >
                                    <option value="" className="text-slate-600">Select Model Target</option>
                                    <option value="ChatGPT">ChatGPT</option>
                                    <option value="Midjourney">Midjourney</option>
                                    <option value="Claude AI">Claude AI</option>
                                    <option value="Stable Diffusion">Stable Diffusion</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-control w-full">
                        <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Short Overview Description</label>
                        <textarea
                            name="fullDescription"
                            required
                            rows={3}
                            value={formData.fullDescription}
                            onChange={handleChange}
                            placeholder="Provide a comprehensive summary detailing what execution targets this prompt achieves..."
                            className="w-full bg-[#0b0f19] border border-slate-800/80 rounded-lg text-slate-100 placeholder-slate-700 focus:border-teal-500/60 focus:outline-none p-3.5 text-sm transition-all resize-none min-h-[90px]"
                        />
                    </div>

                    <div className="form-control w-full">
                        <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                            <FiCode className="text-teal-400" /> Prompt Instruction Content
                        </label>
                        <textarea
                            name="promptContent"
                            required
                            rows={6}
                            value={formData.promptContent}
                            onChange={handleChange}
                            placeholder="Act as an expert content writer... Write the strict system instruction payload here. Use bracket arguments like [Topic] to designate input tokens."
                            className="w-full bg-[#070b12] border border-slate-800/90 rounded-lg text-emerald-400 font-mono placeholder-slate-700 focus:border-teal-500/60 focus:outline-none p-4 text-xs leading-relaxed transition-all min-h-[160px] shadow-inner"
                        />
                    </div>

                    <div className="form-control w-full">
                        <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Variables / Usage Instructions</label>
                        <input
                            type="text"
                            name="usageInstructions"
                            required
                            value={formData.usageInstructions}
                            onChange={handleChange}
                            placeholder="e.g., Replace [Topic] with your subject and [Keyword] before executing."
                            className="w-full bg-[#0b0f19] border border-slate-800/80 rounded-lg text-slate-100 placeholder-slate-700 focus:border-teal-500/60 focus:outline-none px-4 h-11 text-sm transition-all"
                        />
                    </div>
                </div>

                {/* Right Side: Supplementary Parameters & Media Upload Card Container (Takes 1 Column) */}
                <div className="space-y-6">

                    {/* Parameters Control Deck Card */}
                    <div className="bg-[#0f1422] border border-slate-800/80 rounded-xl p-5 space-y-4 shadow-sm">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800/60 pb-3 flex items-center gap-2">
                            <FiHelpCircle className="text-slate-500" /> Configurations
                        </h3>

                        <div className="form-control w-full">
                            <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                                <FiActivity size={12} /> Complexity Matrix
                            </label>
                            <div className="relative">
                                <select
                                    name="difficulty"
                                    value={formData.difficulty}
                                    onChange={handleChange}
                                    className="w-full bg-[#0b0f19] border border-slate-800/80 rounded-lg text-slate-200 focus:border-teal-500/60 focus:outline-none px-3.5 h-10 text-xs appearance-none cursor-pointer transition-all pr-10"
                                >
                                    <option value="Beginner">Beginner Level</option>
                                    <option value="Intermediate">Intermediate Level</option>
                                    <option value="Pro">Pro Elite Level</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-500">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                        </div>

                        <div className="form-control w-full">
                            <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                                <FiDollarSign size={12} /> Marketplace Access Tier
                            </label>
                            <div className="relative">
                                <select
                                    name="tier"
                                    value={formData.tier}
                                    onChange={handleChange}
                                    className="w-full bg-[#0b0f19] border border-slate-800/80 rounded-lg text-slate-200 focus:border-teal-500/60 focus:outline-none px-3.5 h-10 text-xs appearance-none cursor-pointer transition-all pr-10"
                                >
                                    <option value="free">Free Public Access</option>
                                    <option value="premium">Premium Pro Token Gate</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-500">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                        </div>

                        <div className="form-control w-full">
                            <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                                <FiEye size={12} /> Visibility Scope
                            </label>
                            <div className="relative">
                                <select
                                    name="visibility"
                                    value={formData.visibility}
                                    onChange={handleChange}
                                    className="w-full bg-[#0b0f19] border border-slate-800/80 rounded-lg text-slate-200 focus:border-teal-500/60 focus:outline-none px-3.5 h-10 text-xs appearance-none cursor-pointer transition-all pr-10"
                                >
                                    <option value="Public">Public Index Searchable</option>
                                    <option value="Private">Private Repository Storage</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-500">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                        </div>

                        <div className="form-control w-full pt-1">
                            <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Search Meta Tags</label>
                            <input
                                type="text"
                                name="tags"
                                required
                                value={formData.tags.join(", ")}
                                onChange={handleChange}
                                placeholder="e.g., SEO, Blog, AI writing"
                                className="w-full bg-[#0b0f19] border border-slate-800/80 rounded-lg text-slate-100 placeholder-slate-700 focus:border-teal-500/60 focus:outline-none px-3.5 h-10 text-xs transition-all"
                            />
                        </div>
                    </div>

                    {/* Compact Image Uploader Media Card */}
                    <div className="bg-[#0f1422] border border-slate-800/80 rounded-xl p-5 space-y-4 shadow-sm">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800/60 pb-3">
                            Resource Cover Media
                        </h3>

                        <div className="space-y-4">
                            <div className="h-20 rounded-xl bg-[#070b12] border border-dashed border-slate-800 hover:border-slate-700/80 relative flex flex-col items-center justify-center text-center group transition-colors p-1">

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                                />

                                {imageFile ? (
                                    <>
                                        <FiCheckCircle
                                            size={16}
                                            className="text-emerald-400 mb-1"
                                        />
                                        <span className="text-[10px] font-medium text-emerald-400 line-clamp-1">
                                            {imageFile.name}
                                        </span>
                                        <span className="text-[10px] text-slate-600 mt-1">
                                            Click to replace
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <FiImage
                                            size={20}
                                            className="text-slate-600 group-hover:text-slate-400 mb-1.5 transition-colors"
                                        />
                                        <span className="text-xs font-semibold text-slate-300">
                                            Choose Image File
                                        </span>
                                        <span className="text-[10px] text-slate-500 mt-0.5">
                                            PNG, JPG, or WEBP layout assets
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Dispatch Action Execution Controls */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold border-none rounded-lg px-8 h-11 normal-case tracking-wide shadow-lg shadow-teal-500/10 cursor-pointer flex items-center justify-center disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 transition-all text-xs"
                        >
                            {isSubmitting ? (
                                <>
                                    <FiLoader className="animate-spin mr-2" size={14} /> Saving Blueprint...
                                </>
                            ) : (
                                "Submit to Marketplace"
                            )}
                        </button>
                    </div>

                </div>
            </form>
        </div>
    );
};

export default AddPromptPage;