'use client';

import UserAnalyticsModal from '@/components/dashboard/user-dashboard/UserAnalyticsModal';
import { userModalEditData } from '@/lib/actions/userEditModal';
import { DeletePromptById } from '@/lib/actions/userModalDelete';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiBarChart2, FiEdit2, FiLayers, FiTrash2 } from 'react-icons/fi';
import UserDeleteModal from './UserDeleteModal';
import UserEditModal from './UserEditModal';

const PromptTableList = ({ userPromptsData = [] }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPrompt, setSelectedPrompt] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingPrompt, setEditingPrompt] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletingPrompt, setDeletingPrompt] = useState(null);
    const router = useRouter();

    const handleOpenAnalytics = (prompt) => {
        setSelectedPrompt(prompt);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (prompt) => {
        setEditingPrompt(prompt);
        setIsEditModalOpen(true);
    };

    const handleSaveUpdatedData = async (collectedChangedData) => {

        const res = await userModalEditData(
            editingPrompt._id,
            collectedChangedData
        );
        if (res.modifiedCount > 0) {
            router.refresh();
            toast.success('You have succesfully edit the prompt data');
        }
        else {
            toast.error('No document was updated');
        }

        setIsEditModalOpen(false);
    };

    const handleOpenDelete = (prompt) => {
        setDeletingPrompt(prompt);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDeleteData = async (confirmedPrompt) => {
        console.log("SENDING TARGET ID TO API WRAPPER:", confirmedPrompt._id);

        const res = await DeletePromptById(deletingPrompt._id);
        if (res.deletedCount > 0) {
            router.refresh();
            toast.success('Prompt deleted successfully');
        } else {
            toast.error('Prompt not found');
        }

        setIsDeleteModalOpen(false);
    };

    return (
        <>
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        My Prompts
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">
                        Manage, update, and track the performance of your submitted AI prompts.
                    </p>
                </div>
                <div className="text-sm bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-4 py-2 rounded-xl font-medium backdrop-blur-sm">
                    Total: <span className="text-indigo-300 font-semibold">{userPromptsData.length}</span> Prompts
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-[#111827]/60 border border-slate-800 rounded-xl shadow-2xl overflow-hidden backdrop-blur-md">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#161f30] border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                <th className="px-6 py-4.5">Prompt Info</th>
                                <th className="px-6 py-4.5">Category / Tool</th>
                                <th className="px-6 py-4.5">Status</th>
                                <th className="px-6 py-4.5">Tier</th>
                                <th className="px-6 py-4.5">Usage</th>
                                <th className="px-6 py-4.5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 text-sm">
                            {userPromptsData.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-16 text-slate-500">
                                        No prompts found. Start by creating your first prompt!
                                    </td>
                                </tr>
                            ) : (
                                userPromptsData.map((prompt) => (
                                    <tr key={prompt._id?.$oid || prompt._id} className="hover:bg-slate-800/30 transition-all duration-200">
                                        {/* Prompt Info */}
                                        <td className="px-6 py-4 max-w-sm">
                                            <div className="flex items-center gap-3">
                                                {prompt.logoUrl ? (
                                                    <img
                                                        src={prompt.logoUrl}
                                                        alt={prompt.title}
                                                        className="w-10 h-10 rounded-lg object-cover border border-slate-700/50 flex-shrink-0"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500 border border-slate-700/30 flex-shrink-0">
                                                        <FiLayers size={18} />
                                                    </div>
                                                )}
                                                <div className="truncate">
                                                    <p className="font-semibold text-slate-100 truncate">{prompt.title}</p>
                                                    <p className="text-xs text-slate-400 truncate mt-0.5">{prompt.fullDescription}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Category & AI Tool */}
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1.5">
                                                <span className="text-slate-300 font-medium text-xs bg-slate-800/80 border border-slate-700/50 px-2.5 py-0.5 rounded-md w-fit">
                                                    {prompt.category}
                                                </span>
                                                <span className="text-xs text-slate-400 border-l border-slate-700 pl-2 font-medium tracking-wide">
                                                    {prompt.aiTool}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${prompt.status === 'pending'
                                                ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${prompt.status === 'pending' ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`}></span>
                                                {prompt.status || 'pending'}
                                            </span>
                                        </td>

                                        {/* Tier */}
                                        <td className="px-6 py-4 capitalize">
                                            <span className={`text-xs px-2 py-0.5 rounded-md font-medium border ${prompt.tier === 'premium'
                                                ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                                : 'bg-slate-800 text-slate-400 border-slate-700/30'
                                                }`}>
                                                {prompt.tier}
                                            </span>
                                        </td>

                                        {/* Usage */}
                                        <td className="px-6 py-4">
                                            <div className="text-xs text-slate-300 font-medium">
                                                <span className="text-white font-semibold">{prompt.copyCount || 0}</span> copies
                                            </div>
                                            <div className="text-[10px] text-slate-500 mt-0.5 uppercase tracking-wider font-semibold">
                                                {prompt.visibility}
                                            </div>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <button
                                                    onClick={() => handleOpenAnalytics(prompt)}
                                                    title="View Analytics"
                                                    className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-all duration-150 border border-transparent hover:border-indigo-500/20 cursor-pointer"
                                                >
                                                    <FiBarChart2 size={16} />
                                                </button>

                                                {/* Update Action Button inside table row map loop */}
                                                <button
                                                    onClick={() => handleOpenEdit(prompt)}
                                                    title="Update Prompt"
                                                    className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all duration-150 border border-transparent hover:border-emerald-500/20 cursor-pointer"
                                                >
                                                    <FiEdit2 size={16} />
                                                </button>

                                                {/* Delete Button Inside Table Map Loop */}
                                                <button
                                                    onClick={() => handleOpenDelete(prompt)}
                                                    title="Delete Prompt"
                                                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all duration-150 border border-transparent hover:border-rose-500/20 cursor-pointer"
                                                >
                                                    <FiTrash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Imported Modal Component Call */}
            <UserAnalyticsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                prompt={selectedPrompt}
            />

            {/* Rendered next to the Analytics view modal block at the bottom of PromptTableList wrapper */}
            <UserEditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                prompt={editingPrompt}
                onSave={handleSaveUpdatedData}
            />

            {/* Append next to the other modal hooks at the bottom */}
            <UserDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                prompt={deletingPrompt}
                onDeleteConfirm={handleConfirmDeleteData}
            />
        </>
    );
};

export default PromptTableList;