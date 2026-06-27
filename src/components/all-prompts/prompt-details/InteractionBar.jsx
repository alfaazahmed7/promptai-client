// 2. InteractionBar.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiBookmark, FiAlertTriangle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { addBookmark } from '@/lib/actions/bookmark';
import { addReport } from '@/lib/actions/report';

const InteractionBar = ({ promptId, initialBookmarked, initialCopyCount, isLocked }) => {
    const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
    const [copyCount, setCopyCount] = useState(initialCopyCount);
    const [isReporting, setIsReporting] = useState(false);
    const [reportReason, setReportReason] = useState('');
    const [reportDescription, setReportDescription] = useState('');

    const userData = authClient.useSession();
    const user = userData.data?.user;

    // Instant UI cross-component listen logic
    useEffect(() => {
        const handleInstantIncrement = () => {
            setCopyCount(prev => prev + 1);
        };

        window.addEventListener('prompt-copied', handleInstantIncrement);
        return () => {
            window.removeEventListener('prompt-copied', handleInstantIncrement);
        };
    }, []);

    // Sync state if initialCopyCount changes from server actions
    useEffect(() => {
        setCopyCount(initialCopyCount);
    }, [initialCopyCount]);

    const handleBookmark = async () => {
        if (!user?.email) {
            return toast.error('Please log in to save bookmarks');
        }

        try {
            const newState = !isBookmarked;
            setIsBookmarked(newState);
            if (newState) {
                toast.success('Prompt added to bookmarks successfully!');
            } else {
                toast.success('Bookmark removed.');
            }
            const payload = {
                userEmail: user?.email,
                promptId: promptId,
            };
            await addBookmark(payload);
        }
        catch (err) {
            toast.error('An error occurred. Please try again.');
        }
    };

    const handleReportSubmit = async (e) => {
        e.preventDefault();

        if (!user?.email) {
            return toast.error('Please log in to report');
        }

        if (!reportReason) {
            return toast.error('Please pick a valid reason');
        }

        try {
            const payload = {
                userEmail: user.email,
                promptId: promptId,
                reason: reportReason,
                description: reportDescription,
            };

            await addReport(payload);
            toast.success('Report submitted. Our moderation team will review this soon.');

            // Reset state variables upon completion
            setIsReporting(false);
            setReportReason('');
            setReportDescription('');
        }
        catch (err) {
            toast.error('Failed to submit report. Please try again.');
        }
    };

    return (
        /* FIXED WRAPPER: Changed bg-base-200 to bg-[#161f30] and locked border */
        <div className="bg-[#161f30] p-4 rounded-xl border border-gray-700/40 shadow-md flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-6">
                <div className="text-center sm:text-left">
                    <span className="text-xs block text-gray-400 uppercase tracking-wider font-bold">Total Copies</span>
                    <span className="text-xl font-extrabold text-primary">{copyCount}</span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={handleBookmark}
                    className={`btn btn-sm sm:btn-md gap-2 rounded-xl transition-all duration-200 ${isBookmarked ? 'btn-primary' : 'btn-outline text-white border-gray-600 hover:bg-gray-800'}`}
                >
                    <FiBookmark className={isBookmarked ? 'fill-current' : ''} />
                    <span className="hidden sm:inline">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
                </button>

                <button
                    onClick={() => setIsReporting(true)}
                    className="btn btn-sm sm:btn-md btn-outline btn-error gap-2 rounded-xl"
                >
                    <FiAlertTriangle />
                    <span className="hidden sm:inline">Report</span>
                </button>
            </div>

            {isReporting && (
                <div className="modal modal-open backdrop-blur-sm z-50">
                    {/* FIXED MODAL BOX: Swapped bg-base-200 for bg-[#161f30] and stabilized content color bindings */}
                    <div className="modal-box bg-[#161f30] border border-gray-700/50 rounded-2xl max-w-md text-white">
                        <h3 className="font-extrabold text-lg flex items-center gap-2 text-error">
                            <FiAlertTriangle /> Report Prompt
                        </h3>

                        <form onSubmit={handleReportSubmit} className="space-y-4 mt-4">
                            {/* Reason Selection */}
                            <div className="form-control">
                                <label className="label font-semibold text-sm pb-1 text-gray-300">Reason for flag</label>
                                <select
                                    value={reportReason}
                                    onChange={(e) => setReportReason(e.target.value)}
                                    /* FIXED DROP DOWN COLOR: Changed bg-base-100 to bg-[#1a2333] */
                                    className="select select-bordered w-full rounded-xl bg-[#1a2333] border-gray-700 text-white outline-none focus:border-error"
                                    required
                                >
                                    <option value="" className="bg-[#1a2333] text-gray-400">Select a critical reason</option>
                                    <option value="Spam" className="bg-[#1a2333] text-white">Spam or Link Manipulation</option>
                                    <option value="Inappropriate Content" className="bg-[#1a2333] text-white">Inappropriate Content</option>
                                    <option value="Copyright Violation" className="bg-[#1a2333] text-white">Copyright or Intellectual property theft</option>
                                </select>
                            </div>

                            {/* Optional Description Field */}
                            <div className="form-control">
                                <label className="label font-semibold text-sm pb-1 text-gray-300">
                                    <span>Additional Description</span>
                                    <span className="text-xs text-gray-500 font-normal">Optional</span>
                                </label>
                                <textarea
                                    value={reportDescription}
                                    onChange={(e) => setReportDescription(e.target.value)}
                                    placeholder="Provide details about why this prompt violates guidelines..."
                                    /* FIXED TEXTAREA COLOR: Changed bg-base-100 to bg-[#1a2333] */
                                    className="textarea textarea-bordered w-full rounded-xl bg-[#1a2333] border-gray-700 min-h-[100px] text-white leading-relaxed placeholder-gray-500 outline-none focus:border-error"
                                    maxLength={500}
                                />
                            </div>

                            {/* Form Action Controls */}
                            <div className="modal-action mt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsReporting(false);
                                        setReportReason('');
                                        setReportDescription('');
                                    }}
                                    className="btn btn-ghost text-gray-400 hover:bg-gray-800 rounded-xl"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-error rounded-xl font-bold px-6">
                                    Submit Report
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InteractionBar;