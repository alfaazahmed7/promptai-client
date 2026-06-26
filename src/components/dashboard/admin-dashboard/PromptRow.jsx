// src/components/dashboard/admin-dashboard/PromptRow.jsx
'use client';

import { updateUserAddPromptStatus } from '@/lib/actions/userAddPrompt';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
    FiCheck,
    FiX,
    FiTrash2,
    FiStar,
    FiAlertCircle,
    FiMessageSquare,
    FiCheckCircle
} from 'react-icons/fi';

// --- SUB-COMPONENT: APPROVAL MODAL ---
const ApprovalModal = ({ isOpen, onClose, onConfirm, promptTitle }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm text-left">
            <div className="bg-[#111827] border border-slate-800 w-full max-w-md rounded-xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors">
                    <FiX className="w-5 h-5" />
                </button>

                <div className="flex items-center space-x-3 text-emerald-400 mb-4">
                    <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                        <FiCheckCircle className="text-xl" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Approve Submission</h3>
                </div>

                <div className="space-y-4">
                    <p className="text-xs text-slate-400">
                        Are you sure you want to approve <span className="text-white font-medium">{promptTitle}</span>? This will instantly change the submission state to <span className="text-emerald-400 font-semibold uppercase">Approved</span> and publish it live on promptAI.
                    </p>

                    <div className="flex space-x-3 justify-end text-sm font-medium pt-2">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 shadow-lg shadow-emerald-600/20 transition-all"
                        >
                            Confirm Approval
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- SUB-COMPONENT: REJECTION MODAL WITH FEEDBACK ---
const RejectionModal = ({ isOpen, onClose, onConfirm, promptTitle }) => {
    const [feedback, setFeedback] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm(feedback);
        setFeedback('');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm text-left">
            <div className="bg-[#111827] border border-slate-800 w-full max-w-md rounded-xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors">
                    <FiX className="w-5 h-5" />
                </button>

                <div className="flex items-center space-x-3 text-rose-400 mb-4">
                    <div className="p-2 bg-rose-500/10 rounded-lg border border-rose-500/20">
                        <FiAlertCircle className="text-xl" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Reject Submission</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <p className="text-xs text-slate-400">
                        Please state the structural reasons or policy violations for denying <span className="text-white font-medium">{promptTitle}</span>. The author will be systematically notified.
                    </p>

                    <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Admin Remarks</label>
                        <textarea
                            required
                            rows={4}
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Provide descriptive advice on what needs improvement (e.g., poor clarity, invalid tags...)"
                            className="w-full bg-[#0b0f19] text-slate-200 p-3 border border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-500/60 transition-all placeholder:text-slate-600 resize-none"
                        />
                    </div>

                    <div className="flex space-x-3 justify-end text-sm font-medium pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-500 shadow-lg shadow-rose-600/20 transition-all"
                        >
                            Confirm Reject
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- SUB-COMPONENT: FEATURE MODAL ---
const FeatureModal = ({ isOpen, onClose, onConfirm, promptTitle }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm text-left">
            <div className="bg-[#111827] border border-slate-800 w-full max-w-md rounded-xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors">
                    <FiX className="w-5 h-5" />
                </button>

                <div className="flex items-center space-x-3 text-indigo-400 mb-4">
                    <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                        <FiStar className="text-xl" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Feature Prompt</h3>
                </div>

                <div className="space-y-4">
                    <p className="text-xs text-slate-400">
                        Are you sure you want to promote <span className="text-white font-medium">{promptTitle}</span> to the homepage spotlight? This features it prominently to all users on promptAI.
                    </p>

                    <div className="flex space-x-3 justify-end text-sm font-medium pt-2">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 transition-all"
                        >
                            Confirm Feature
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- SUB-COMPONENT: DELETE MODAL ---
const DeleteModal = ({ isOpen, onClose, onConfirm, promptTitle }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm text-left">
            <div className="bg-[#111827] border border-slate-800 w-full max-w-md rounded-xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors">
                    <FiX className="w-5 h-5" />
                </button>

                <div className="flex items-center space-x-3 text-rose-500 mb-4">
                    <div className="p-2 bg-rose-500/10 rounded-lg border border-rose-500/20">
                        <FiTrash2 className="text-xl" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Delete Submission</h3>
                </div>

                <div className="space-y-4">
                    <p className="text-xs text-slate-400">
                        Warning: This action is permanent. Are you absolutely certain you want to destroy <span className="text-white font-medium">{promptTitle}</span> and remove it completely from the system database?
                    </p>

                    <div className="flex space-x-3 justify-end text-sm font-medium pt-2">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-500 shadow-lg shadow-rose-600/20 transition-all"
                        >
                            Delete Permanently
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MAIN ROW/CARD COMPONENT ---
const PromptRow = ({ prompt, view }) => {
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const router = useRouter();

    // Helpers for dynamic visual styles
    const getStatusStyles = (status) => {
        switch (status) {
            case 'approved': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'rejected': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
            default: return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
        }
    };

    const getDifficultyStyles = (lvl) => {
        switch (String(lvl).toLowerCase()) {
            case 'advanced': return 'text-purple-400';
            case 'intermediate': return 'text-blue-400';
            default: return 'text-slate-400';
        }
    };

    // BACKEND HANDLERS 
    const handleApproveConfirm = async () => {
        const res = await updateUserAddPromptStatus(prompt._id || prompt.id);
        if (res.insertedId) {
            router.refresh();
            toast.success(`Prompt submitted by ${prompt.userEmail} has been approved.`);
        }
        else {
            toast.error('No document was updated');
        }

        setIsApproveModalOpen(false);
    };

    const handleRejectConfirm = (feedbackRemarks) => {
        console.log(`Prompt ID "${prompt._id?.$oid}" Rejected with remarks: "${feedbackRemarks}"`);
        // TODO: Add backend API call here
        setIsRejectModalOpen(false);
    };

    const handleFeatureConfirm = () => {
        console.log(`Prompt ID "${prompt._id?.$oid}" Featured backend trigger placeholder.`);
        // TODO: Add backend API call here
        setIsFeatureModalOpen(false);
    };

    const handleDeleteConfirm = () => {
        console.log(`Prompt ID "${prompt._id?.$oid}" Delete backend trigger placeholder.`);
        // TODO: Add backend API call here
        setIsDeleteModalOpen(false);
    };

    // Formatted as a JSX variable block to avoid inner re-rendering crashes
    const actionsGroup = (
        <div className="flex items-center space-x-1.5 justify-end">
            <button onClick={() => setIsApproveModalOpen(true)} title="Approve Prompt" className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all cursor-pointer">
                <FiCheck className="w-4 h-4" />
            </button>
            <button onClick={() => setIsRejectModalOpen(true)} title="Reject Prompt" className="p-2 text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-all cursor-pointer">
                <FiMessageSquare className="w-4 h-4" />
            </button>
            <button onClick={() => setIsFeatureModalOpen(true)} title="Feature Prompt" className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-all cursor-pointer">
                <FiStar className="w-4 h-4" />
            </button>
            <button onClick={() => setIsDeleteModalOpen(true)} title="Delete Submission" className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all cursor-pointer">
                <FiTrash2 className="w-4 h-4" />
            </button>
        </div>
    );

    // --- DESKTOP TABLE VIEW ---
    if (view === 'desktop') {
        return (
            <tr className="hover:bg-[#111827]/40 transition-colors group">
                {/* Logo & Content Info */}
                <td className="py-4 px-6 max-w-sm">
                    <div className="flex items-start space-x-3">
                        <img
                            src={prompt.logoUrl || "https://images.unsplash.com/photo-1607799279861-4dd421887fb3"}
                            alt={prompt.aiTool}
                            className="w-9 h-9 rounded-lg object-cover bg-[#0b0f19] border border-slate-800 mt-0.5"
                        />
                        <div className="overflow-hidden">
                            <h2 className="font-semibold text-slate-200 group-hover:text-white transition-colors truncate">{prompt.title}</h2>
                            <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{prompt.fullDescription}</p>
                            <span className={`text-[10px] font-mono tracking-wide uppercase font-semibold ${getDifficultyStyles(prompt.difficulty)}`}>
                                • {prompt.difficulty}
                            </span>
                        </div>
                    </div>
                </td>

                {/* Contributor Profile */}
                <td className="py-4 px-6">
                    <div>
                        <p className="text-slate-300 font-medium truncate">{prompt.userEmail.split('@')[0]}</p>
                        <p className="text-[11px] text-slate-500 font-mono">{prompt.userEmail}</p>
                        <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.2 bg-slate-800 text-slate-400 rounded mt-1 inline-block text-center font-bold">{prompt.userRole}</span>
                    </div>
                </td>

                {/* Engine Classification */}
                <td className="py-4 px-4">
                    <div>
                        <span className="text-xs font-semibold px-2 py-0.5 bg-blue-500/5 text-blue-400 border border-blue-500/10 rounded-md block w-fit mb-1">{prompt.aiTool}</span>
                        <span className="text-xs text-slate-400 block pl-1">{prompt.category}</span>
                    </div>
                </td>

                {/* Sub-State Specifications */}
                <td className="py-4 px-4">
                    <div className="space-y-1.5">
                        <span className={`inline-flex items-center px-2 py-0.5 border rounded-full text-[11px] font-semibold tracking-wider uppercase ${getStatusStyles(prompt.status)}`}>
                            {prompt.status}
                        </span>
                        <span className={`block text-xs font-medium uppercase pl-1 ${prompt.tier === 'premium' || prompt.tier === 'pro' ? 'text-emerald-400' : 'text-slate-500'}`}>
                            [{prompt.tier || 'free'}]
                        </span>
                    </div>
                </td>

                {/* Actions Configuration */}
                <td className="py-4 px-6 text-right overflow-visible">
                    {actionsGroup}

                    {/* Modals Universal Layer */}
                    <ApprovalModal
                        isOpen={isApproveModalOpen}
                        onClose={() => setIsApproveModalOpen(false)}
                        onConfirm={handleApproveConfirm}
                        promptTitle={prompt.title}
                    />
                    <RejectionModal
                        isOpen={isRejectModalOpen}
                        onClose={() => setIsRejectModalOpen(false)}
                        onConfirm={handleRejectConfirm}
                        promptTitle={prompt.title}
                    />
                    <FeatureModal
                        isOpen={isFeatureModalOpen}
                        onClose={() => setIsFeatureModalOpen(false)}
                        onConfirm={handleFeatureConfirm}
                        promptTitle={prompt.title}
                    />
                    <DeleteModal
                        isOpen={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        onConfirm={handleDeleteConfirm}
                        promptTitle={prompt.title}
                    />
                </td>
            </tr>
        );
    }

    // --- MOBILE/TABLET CARD VIEW ---
    return (
        <div className="bg-[#111827]/60 p-5 rounded-xl border border-slate-800/80 shadow-lg flex flex-col space-y-4">
            <div className="flex items-start justify-between space-x-3">
                <div className="flex items-center space-x-3 overflow-hidden">
                    <img
                        src={prompt.logoUrl || "https://images.unsplash.com/photo-1607799279861-4dd421887fb3"}
                        alt={prompt.aiTool}
                        className="w-11 h-11 rounded-lg object-cover bg-[#0b0f19] border border-slate-800"
                    />
                    <div className="overflow-hidden">
                        <h2 className="font-semibold text-slate-200 truncate">{prompt.title}</h2>
                        <span className="text-xs font-mono text-slate-500">{prompt.aiTool} • {prompt.category}</span>
                    </div>
                </div>
                <span className={`inline-flex items-center px-2 py-0.5 border rounded text-[10px] font-bold uppercase tracking-wider ${getStatusStyles(prompt.status)}`}>
                    {prompt.status}
                </span>
            </div>

            <p className="text-xs text-slate-400 line-clamp-2 bg-[#0b0f19]/40 p-2.5 rounded-lg border border-slate-800/30">
                {prompt.fullDescription}
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800/60">
                <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Submitted By</span>
                    <span className="text-slate-300 truncate block">{prompt.userEmail}</span>
                </div>
                <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Tier / Difficulty</span>
                    <span className="text-slate-300 capitalize">{prompt.tier || 'free'} • <span className={getDifficultyStyles(prompt.difficulty)}>{prompt.difficulty}</span></span>
                </div>
            </div>

            <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">Actions Menu:</span>
                {actionsGroup}
            </div>

            {/* Modals Universal Layer */}
            <ApprovalModal
                isOpen={isApproveModalOpen}
                onClose={() => setIsApproveModalOpen(false)}
                onConfirm={handleApproveConfirm}
                promptTitle={prompt.title}
            />
            <RejectionModal
                isOpen={isRejectModalOpen}
                onClose={() => setIsRejectModalOpen(false)}
                onConfirm={handleRejectConfirm}
                promptTitle={prompt.title}
            />
            <FeatureModal
                isOpen={isFeatureModalOpen}
                onClose={() => setIsFeatureModalOpen(false)}
                onConfirm={handleFeatureConfirm}
                promptTitle={prompt.title}
            />
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                promptTitle={prompt.title}
            />
        </div>
    );
};

export default PromptRow;