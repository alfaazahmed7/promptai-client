// src/components/dashboard/admin-dashboard/ReportRow.jsx
'use client';

import React, { useState } from 'react';
import {
    FiUser,
    FiX,
    FiTrash2,
    FiCheck,
    FiAlertTriangle,
    FiCalendar,
    FiHash,
    FiBell
} from 'react-icons/fi';

// --- SUB-COMPONENT: GENERAL CONFIRMATION MODAL ---
const ModerationModal = ({ isOpen, onClose, onConfirm, title, description, icon: Icon, confirmBtnClass }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm text-left">
            <div className="bg-[#111827] border border-slate-800 w-full max-w-md rounded-xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors">
                    <FiX className="w-5 h-5" />
                </button>

                <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-slate-800 border border-slate-700/60 rounded-lg">
                        <Icon className="text-xl" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{title}</h3>
                </div>

                <div className="space-y-4">
                    <p className="text-xs text-slate-400 line-clamp-4">{description}</p>
                    <div className="flex space-x-3 justify-end text-sm font-medium pt-2">
                        <button onClick={onClose} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors">
                            Cancel
                        </button>
                        <button onClick={onConfirm} className={`px-4 py-2 text-white rounded-lg transition-all shadow-lg ${confirmBtnClass}`}>
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MAIN ROW/CARD COMPONENT ---
const ReportRow = ({ report, view }) => {
    const [modalState, setModalState] = useState({ type: null, isOpen: false });

    const openModal = (type) => setModalState({ type, isOpen: true });
    const closeModal = () => setModalState({ type: null, isOpen: false });

    // Formatting rules
    const formatDate = (dateInput) => {
        if (!dateInput) return 'N/A';
        const target = dateInput.$date ? dateInput.$date : dateInput;
        return new Date(target).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getReasonBadgeStyles = (reason) => {
        switch (reason) {
            case 'Spam': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
            default: return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
        }
    };

    // --- EMPTY BACKEND HANDLERS FOR YOUR CUSTOM INTEGRATION ---
    const handleDismissReport = () => {
        console.log(`Report ID "${report._id}" Dismissed backend logic trigger.`);
        closeModal();
    };

    const handleWarnCreator = () => {
        console.log(`Creator Warning pipeline triggered via Report ID "${report._id?.$oid}".`);
        closeModal();
    };

    const handleDeletePrompt = () => {
        console.log(`Target Prompt ID "${report.promptId?.$oid}" Delete trigger logic.`);
        closeModal();
    };

    // Render operational static button arrays
    const actionsGroup = (
        <div className="flex items-center space-x-1.5 justify-end">
            <button onClick={() => openModal('dismiss')} title="Dismiss Report" className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all cursor-pointer">
                <FiCheck className="w-4 h-4" />
            </button>
            <button onClick={() => openModal('warn')} title="Warn Creator Account" className="p-2 text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-all cursor-pointer">
                <FiBell className="w-4 h-4" />
            </button>
            <button onClick={() => openModal('delete')} title="Delete Reported Prompt" className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all cursor-pointer">
                <FiTrash2 className="w-4 h-4" />
            </button>
        </div>
    );

    // --- DESKTOP TABLE VIEW ---
    if (view === 'desktop') {
        return (
            <tr className="hover:bg-[#111827]/40 transition-colors group">
                {/* User Reporter Profile */}
                <td className="py-4 px-6 max-w-[200px]">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700/60 flex items-center justify-center text-slate-400 group-hover:text-white transition-all flex-shrink-0">
                            <FiUser className="w-4 h-4" />
                        </div>
                        <div className="overflow-hidden">
                            <p className="font-semibold text-slate-200 group-hover:text-white transition-colors truncate">{report.userEmail.split('@')[0]}</p>
                            <p className="text-xs text-slate-400 font-mono truncate">{report.userEmail}</p>
                        </div>
                    </div>
                </td>

                {/* Reason & Content Description */}
                <td className="py-4 px-6 max-w-sm">
                    <div className="space-y-1">
                        <span className={`inline-flex px-1.5 py-0.2 text-[10px] uppercase tracking-wider font-bold border rounded ${getReasonBadgeStyles(report.reason)}`}>
                            {report.reason}
                        </span>
                        <p className="text-xs text-slate-300 line-clamp-2">{report.description}</p>
                    </div>
                </td>

                {/* Targeted Content Link ID */}
                <td className="py-4 px-6 font-mono text-xs text-slate-500">
                    <span className="flex items-center gap-1" title={report?.promptId}>
                        <FiHash className="text-slate-600" />
                        {report?.promptId
                            ? `${report.promptId.substring(0, 12)}...`
                            : "Unknown ID"}
                    </span>
                </td>

                {/* Report Generation Date */}
                <td className="py-4 px-6 font-mono text-xs text-slate-400">
                    {formatDate(report.createdAt)}
                </td>

                {/* Interactive Moderation Tools */}
                <td className="py-4 px-6 text-right overflow-visible">
                    {actionsGroup}

                    {/* Modal Conditional Renderings */}
                    <ModerationModal
                        isOpen={modalState.isOpen && modalState.type === 'dismiss'}
                        onClose={closeModal}
                        onConfirm={handleDismissReport}
                        title="Dismiss Violation Report"
                        description="Are you sure you want to dismiss this complaint? No action will be applied against the target prompt submission, and the ticket will be closed."
                        icon={FiCheck}
                        confirmBtnClass="bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20"
                    />
                    <ModerationModal
                        isOpen={modalState.isOpen && modalState.type === 'warn'}
                        onClose={closeModal}
                        onConfirm={handleWarnCreator}
                        title="Issue Warning Notification"
                        description={`This will register an internal system infraction check to the user's portal account indicating policy violations on their prompt content.`}
                        icon={FiBell}
                        confirmBtnClass="bg-amber-600 hover:bg-amber-500 shadow-amber-600/20"
                    />
                    <ModerationModal
                        isOpen={modalState.isOpen && modalState.type === 'delete'}
                        onClose={closeModal}
                        onConfirm={handleDeletePrompt}
                        title="Execute Prompt Destruction"
                        description={`Critical: This permanently purges the prompt submission with ID: ${report.promptId?.$oid} completely out of the promptAI ecosystem.`}
                        icon={FiTrash2}
                        confirmBtnClass="bg-rose-600 hover:bg-rose-500 shadow-rose-600/20"
                    />
                </td>
            </tr>
        );
    }

    // --- MOBILE/TABLET CARD VIEW ---
    return (
        <div className="bg-[#111827]/60 p-5 rounded-xl border border-slate-800/80 shadow-md flex flex-col space-y-4">
            <div className="flex items-start justify-between space-x-2">
                <div className="flex items-center space-x-3 overflow-hidden">
                    <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex-shrink-0 flex items-center justify-center text-slate-400">
                        <FiUser className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                        <h2 className="font-semibold text-slate-200 truncate">{report.userEmail.split('@')[0]}</h2>
                        <span className="text-xs font-mono text-slate-400 block truncate">{report.userEmail}</span>
                    </div>
                </div>
                <span className={`inline-flex items-center px-2 py-0.5 border text-[10px] font-bold uppercase tracking-wider rounded ${getReasonBadgeStyles(report.reason)}`}>
                    {report.reason}
                </span>
            </div>

            <p className="text-xs text-slate-300 bg-[#0b0f19]/40 p-3 rounded-lg border border-slate-800/40">
                <span className="text-slate-500 font-medium block text-[10px] uppercase tracking-wider mb-1">Report Description</span>
                {report.description}
            </p>

            <div className="space-y-2 text-xs text-slate-400">
                <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1 font-medium"><FiHash /> Target Prompt ID:</span>
                    <span className="font-mono text-slate-400 max-w-[150px] truncate">{report.promptId?.$oid}</span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1 font-medium"><FiCalendar /> Logged On:</span>
                    <span className="font-mono text-[11px]">{formatDate(report.createdAt)}</span>
                </div>
            </div>

            <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">Mod Options:</span>
                {actionsGroup}
            </div>

            {/* Mobile Modal Layers */}
            <ModerationModal
                isOpen={modalState.isOpen && modalState.type === 'dismiss'}
                onClose={closeModal}
                onConfirm={handleDismissReport}
                title="Dismiss Violation Report"
                description="Are you sure you want to dismiss this complaint? No action will be applied against the target prompt submission, and the ticket will be closed."
                icon={FiCheck}
                confirmBtnClass="bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20"
            />
            <ModerationModal
                isOpen={modalState.isOpen && modalState.type === 'warn'}
                onClose={closeModal}
                onConfirm={handleWarnCreator}
                title="Issue Warning Notification"
                description={`This will register an internal system infraction check to the user's portal account indicating policy violations on their prompt content.`}
                icon={FiBell}
                confirmBtnClass="bg-amber-600 hover:bg-amber-500 shadow-amber-600/20"
            />
            <ModerationModal
                isOpen={modalState.isOpen && modalState.type === 'delete'}
                onClose={closeModal}
                onConfirm={handleDeletePrompt}
                title="Execute Prompt Destruction"
                description={`Critical: This permanently purges the prompt submission with ID: ${report.promptId?.$oid} completely out of the promptAI ecosystem.`}
                icon={FiTrash2}
                confirmBtnClass="bg-rose-600 hover:bg-rose-500 shadow-rose-600/20"
            />
        </div>
    );
};

export default ReportRow;