"use client";

import { deleteBookmarkById } from '@/lib/actions/bookmark';
import { DeletePromptById } from '@/lib/actions/userModalDelete';
import Link from 'next/link';
import React, { useState, useTransition } from 'react';
import toast from 'react-hot-toast';
import {
    FiBookmark,
    FiExternalLink,
    FiTrash2,
    FiCpu,
    FiCalendar,
    FiAlertTriangle,
    FiX
} from 'react-icons/fi';

const SavedPromptsList = ({ initialPrompts = [] }) => {
    const [prompts, setPrompts] = useState(initialPrompts);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activePrompt, setActivePrompt] = useState(null);
    const [isPending, startTransition] = useTransition();

    const handleDeleteClick = (prompt) => {
        setActivePrompt(prompt);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (!activePrompt) return;

        startTransition(async () => {
            try {
                const res = await deleteBookmarkById(activePrompt?.bookmarkId);
                if (res.deletedCount > 0) {
                    console.log(res, 'res');
                    toast.success('Prompt deleted successfully');
                } else {
                    toast.error('Prompt not found');
                }

                // Optimistically remove the card from UI state instantly
                setPrompts((prev) => prev.filter(p => p.bookmarkId !== activePrompt.bookmarkId));
                setIsModalOpen(false);
                setActivePrompt(null);
            } catch (error) {
                console.error("Failed to delete bookmark:", error);
            }
        });
    };

    if (prompts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center text-center py-20 border border-dashed border-slate-800/60 rounded-xl bg-slate-900/10">
                <FiBookmark size={24} className="text-slate-600 mb-3" />
                <h3 className="text-sm font-medium text-slate-400">No saved items found</h3>
            </div>
        );
    }

    return (
        <>
            {/* List Layout wrapper */}
            <div className="flex flex-col gap-3">
                {prompts.map((prompt) => (
                    <div
                        key={prompt.bookmarkId}
                        className="group flex flex-col sm:flex-row items-start sm:items-center bg-slate-900/20 hover:bg-slate-900/40 border border-slate-800/60 rounded-xl p-4 transition-colors duration-200 gap-4"
                    >
                        {/* Fixed Square Ratio Image Thumbnail Frame */}
                        <div className="relative w-full sm:w-28 h-28 sm:h-28 rounded-lg overflow-hidden bg-slate-950 shrink-0 border border-slate-800/80">
                            <img
                                src={prompt.image}
                                alt={prompt.title}
                                className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 ring-1 ring-inset ring-black/40" />
                        </div>

                        {/* Text and Actions Right-hand side content */}
                        <div className="flex flex-col justify-between flex-1 min-w-0">
                            <div>
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded">
                                            {prompt.category}
                                        </span>
                                        <span className="text-[10px] font-medium text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded flex items-center gap-1 border border-slate-800">
                                            <FiCpu className="size-2.5 text-sky-400" />
                                            {prompt.aiTool}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                                        <span>by <strong className="text-slate-400 font-normal">{prompt.creatorName}</strong></span>
                                        <span className="w-1 h-1 bg-slate-700 rounded-full" />
                                        <span className="flex items-center gap-1">
                                            <FiCalendar className="size-3" />
                                            {prompt.savedDate}
                                        </span>
                                    </div>
                                </div>

                                <h3 className="text-base font-medium text-slate-100 tracking-tight transition-colors group-hover:text-violet-400">
                                    {prompt.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-400 mt-1 line-clamp-2 sm:line-clamp-1 leading-relaxed max-w-4xl">
                                    {prompt.fullDescription}
                                </p>
                            </div>

                            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800/40">
                                <div className="flex items-center gap-2 overflow-hidden">
                                    {prompt.tags?.slice(0, 3).map((tag, i) => (
                                        <span key={i} className="text-xs text-slate-500 truncate">
                                            #{tag.toLowerCase()}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-1.5 shrink-0 ml-auto">
                                    <button
                                        onClick={() => handleDeleteClick(prompt)}
                                        title="Delete bookmark"
                                        className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                                    >
                                        <FiTrash2 size={16} />
                                    </button>
                                    <Link
                                        href={`/all-prompts/${prompt._id}`}
                                        className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-700 text-slate-300 rounded-lg transition-colors cursor-pointer"
                                    >
                                        <span>Details</span>
                                        <FiExternalLink size={12} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Portal Overlay UI */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    />

                    <div className="relative bg-[#0d1321] border border-slate-800 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl shadow-black/80 animate-in fade-in zoom-in-95 duration-200 p-6">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 p-1 text-slate-500 hover:text-slate-300 rounded-lg transition-colors"
                        >
                            <FiX size={18} />
                        </button>

                        <div className="flex gap-4 items-start">
                            <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl shrink-0">
                                <FiAlertTriangle size={22} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-base font-semibold text-white tracking-tight">
                                    Remove Bookmark?
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
                                    Are you sure you want to remove <strong className="text-slate-200 font-medium">{activePrompt?.title}</strong> from your saved collection?
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-slate-800/60">
                            <button
                                disabled={isPending}
                                onClick={() => setIsModalOpen(false)}
                                className="px-3.5 py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={isPending}
                                onClick={handleConfirmDelete}
                                className="px-4 py-2 text-xs font-semibold bg-rose-600 hover:bg-rose-500 disabled:bg-rose-600/50 text-white rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                            >
                                {isPending ? "Removing..." : "Remove"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SavedPromptsList;