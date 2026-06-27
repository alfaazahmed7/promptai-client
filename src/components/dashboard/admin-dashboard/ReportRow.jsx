// src/components/dashboard/admin-dashboard/ReportRow.jsx
'use client';

import { deleteReport, dismissReport, warnReportedPrompt } from '@/lib/actions/report';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
    FiUser,
    FiX,
    FiTrash2,
    FiCheck,
    FiCalendar,
    FiHash,
    FiBell
} from 'react-icons/fi';


// 1. DISMISS REPORT MODAL
const DismissReportModal = ({ isOpen, onClose, onConfirm, adminReportFeedback }) => {
    if (!isOpen) return null;

    const isDismissed = adminReportFeedback === "dismiss";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm text-left">
            <div className="bg-[#111827] border border-slate-800 w-full max-w-md rounded-xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">

                {isDismissed ? (
                    <>
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="p-2 bg-slate-500/10 rounded-lg border border-slate-500/20">
                                <FiCheck className="text-xl text-slate-400" />
                            </div>

                            <h3 className="text-lg font-semibold text-white">
                                Report Already Dismissed
                            </h3>
                        </div>

                        <p className="text-sm text-slate-300">
                            This report has already been{" "}
                            <span className="font-semibold text-emerald-400">
                                dismissed
                            </span>.
                        </p>

                        <p className="text-xs text-slate-500 mt-2">
                            No further moderation action is required.
                        </p>

                        <div className="flex justify-end mt-6">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                        >
                            <FiX className="w-5 h-5" />
                        </button>

                        <div className="flex items-center space-x-3 text-emerald-400 mb-4">
                            <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                                <FiCheck className="text-xl" />
                            </div>

                            <h3 className="text-lg font-semibold text-white">
                                Dismiss Violation Report
                            </h3>
                        </div>

                        <div className="space-y-4">
                            <p className="text-xs text-slate-400">
                                Are you sure you want to dismiss this complaint?
                                No action will be applied against the target
                                prompt submission and the report will be marked
                                as resolved.
                            </p>

                            <div className="flex space-x-3 justify-end text-sm font-medium pt-2">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={onConfirm}
                                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
                                >
                                    Confirm Dismissal
                                </button>
                            </div>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
};

// 2. WARN CREATOR MODAL
const WarnCreatorModal = ({
    isOpen,
    onClose,
    onConfirm,
    adminReportFeedback
}) => {
    if (!isOpen) return null;

    const isWarned = adminReportFeedback === "warning";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm text-left">
            <div className="bg-[#111827] border border-slate-800 w-full max-w-md rounded-xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">

                {isWarned ? (
                    <>
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="p-2 bg-slate-500/10 rounded-lg border border-slate-500/20">
                                <FiBell className="text-xl text-slate-400" />
                            </div>

                            <h3 className="text-lg font-semibold text-white">
                                Warning Already Issued
                            </h3>
                        </div>

                        <p className="text-sm text-slate-300">
                            A warning has already been issued for this reported prompt.
                        </p>

                        <p className="text-xs text-slate-500 mt-2">
                            No further warning action is required.
                        </p>

                        <div className="flex justify-end mt-6">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                        >
                            <FiX className="w-5 h-5" />
                        </button>

                        <div className="flex items-center space-x-3 mb-4">
                            <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
                                <FiBell className="text-xl text-amber-400" />
                            </div>

                            <h3 className="text-lg font-semibold text-white">
                                Issue Warning Notification
                            </h3>
                        </div>

                        <div className="space-y-4">
                            <p className="text-xs text-slate-400">
                                This will register an internal system infraction
                                against the creator account and notify them about
                                policy violations associated with their prompt
                                content.
                            </p>

                            <div className="flex space-x-3 justify-end text-sm font-medium pt-2">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={onConfirm}
                                    className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-500 shadow-lg shadow-amber-600/20 transition-all cursor-pointer"
                                >
                                    Confirm Warning
                                </button>
                            </div>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
};

// 3. DELETE PROMPT MODAL
const DeletePromptModal = ({ isOpen, onClose, onConfirm, promptId }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm text-left">
            <div className="bg-[#111827] border border-slate-800 w-full max-w-md rounded-xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors">
                    <FiX className="w-5 h-5" />
                </button>

                <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-slate-800 border border-slate-700/60 rounded-lg">
                        <FiTrash2 className="text-xl text-rose-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Execute Prompt Destruction</h3>
                </div>

                <div className="space-y-4">
                    <p className="text-xs text-slate-400 line-clamp-4">
                        Critical: This permanently purges the prompt submission with ID: {promptId?.$oid || promptId} completely out of the promptAI ecosystem.
                    </p>
                    <div className="flex space-x-3 justify-end text-sm font-medium pt-2">
                        <button onClick={onClose} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer">
                            Cancel
                        </button>
                        <button onClick={onConfirm} className="px-4 py-2 text-white rounded-lg transition-all shadow-lg cursor-pointer bg-rose-600 hover:bg-rose-500 shadow-rose-600/20">
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// MAIN ROW/CARD COMPONENT
const ReportRow = ({ report, view }) => {
    const [modalState, setModalState] = useState({ type: null, isOpen: false });

    const openModal = (type) => setModalState({ type, isOpen: true });
    const closeModal = () => setModalState({ type: null, isOpen: false });
    const router = useRouter();

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

    // --- BACKEND HANDLERS ---
    const handleDismissReport = async () => {
        const res = await dismissReport(report._id || report.id, report.promptId);
        if (res.success) {
            router.refresh();
            toast.success(`Report dismissed successfully`);
        }
        closeModal();
    };

    const handleWarnCreator = async () => {
        const res = await warnReportedPrompt(report._id || report.id, report.promptId);
        if (res.success) {
            router.refresh();
            toast.success(`Warning issued successfully`);
        }

        closeModal();
    };

    const handleDeletePrompt = async () => {
        const res = await deleteReport(report._id || report.id);
        if (res.deletedCount > 0) {
            router.refresh();
            toast.success('Reported prompt deletaded successfully');
        }

        closeModal();
    };

    // Render operational action buttons
    const actionsGroup = (
        <div className="flex items-center space-x-1.5 justify-end">
            <button onClick={() => openModal('dismiss')} title="Dismiss Report" className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all cursor-pointer">
                <FiCheck className={report.adminReportFeedback === "dismiss" ? "text-green-600 w-4 h-4" : "w-4 h-4"} />
            </button>
            <button onClick={() => openModal('warn')} title="Warn Creator Account" className="p-2 text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-all cursor-pointer">
                <FiBell className={report.adminReportFeedback === "warning" ?
                    'text-amber-400 w-4 h-4' : "w-4 h-4"
                } />
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
                            ? `${(report.promptId?.$oid || report.promptId).substring(0, 12)}...`
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

                    {/* Dedicated Desktop Modals */}
                    <DismissReportModal
                        isOpen={modalState.isOpen && modalState.type === 'dismiss'}
                        onClose={closeModal}
                        onConfirm={handleDismissReport}
                        adminReportFeedback={report.adminReportFeedback}
                    />
                    <WarnCreatorModal
                        isOpen={modalState.isOpen && modalState.type === 'warn'}
                        onClose={closeModal}
                        onConfirm={handleWarnCreator}
                        adminReportFeedback={report.adminReportFeedback}
                    />
                    <DeletePromptModal
                        isOpen={modalState.isOpen && modalState.type === 'delete'}
                        onClose={closeModal}
                        onConfirm={handleDeletePrompt}
                        promptId={report.promptId}
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
                    <span className="font-mono text-slate-400 max-w-[150px] truncate">{report.promptId?.$oid || report.promptId}</span>
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

            {/* Dedicated Mobile Modals */}
            <DismissReportModal
                isOpen={modalState.isOpen && modalState.type === 'dismiss'}
                onClose={closeModal}
                onConfirm={handleDismissReport}
                adminReportFeedback={report.adminReportFeedback}
            />
            <WarnCreatorModal
                isOpen={modalState.isOpen && modalState.type === 'warn'}
                onClose={closeModal}
                onConfirm={handleWarnCreator}
                adminReportFeedback={report.adminReportFeedback}
            />
            <DeletePromptModal
                isOpen={modalState.isOpen && modalState.type === 'delete'}
                onClose={closeModal}
                onConfirm={handleDeletePrompt}
                promptId={report.promptId}
            />
        </div>
    );
};

export default ReportRow;