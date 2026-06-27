// 3. PromptComponentCard.jsx
'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCopy, FiCheck, FiLock } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { incrementCopyCount } from '@/lib/actions/copyCount';
import Link from 'next/link';

const PromptContentCard = ({ prompt, isLocked }) => {
    const [copied, setCopied] = useState(false);
    const router = useRouter();

    const handleCopy = async () => {
        if (isLocked) return;
        try {
            await navigator.clipboard.writeText(prompt.promptContent);
            setCopied(true);
            toast.success('Prompt context copied to clipboard!');

            // Fire a custom event to instantly notify the InteractionBar component
            window.dispatchEvent(new Event('prompt-copied'));
            setTimeout(() => setCopied(false), 2000);

            // Fire the database API mutation background promise tracking task
            await incrementCopyCount(prompt._id);

            // Soft-refresh the server component tracking cache silently
            router.refresh();
        }
        catch (err) {
            toast.error('Failed to copy code structural data.');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative bg-[#161f30] text-white rounded-2xl shadow-xl overflow-hidden border border-gray-700/40 transition-all duration-300 ${isLocked ? 'min-h-[320px]' : ''}`}
        >
            <div className="bg-[#1a2333] px-5 py-3 flex items-center justify-between border-b border-gray-700/30">
                <span className="font-mono text-xs text-gray-400 tracking-wide">PROMPT ENGINE TEMPLATE</span>
                {!isLocked && (
                    <button
                        onClick={handleCopy}
                        className="btn btn-xs btn-primary gap-1 rounded-md norm-case font-sans"
                    >
                        {copied ? <FiCheck className="text-success" /> : <FiCopy />}
                        {copied ? 'Copied' : 'Copy Prompt'}
                    </button>
                )}
            </div>

            <div className={`p-6 font-mono text-sm leading-relaxed whitespace-pre-wrap select-none transition-all duration-500 ${isLocked ? 'blur-md max-h-48 overflow-hidden opacity-30 select-none' : 'text-gray-200'}`}>
                {prompt.promptContent}
            </div>

            {isLocked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#161f30]/90 backdrop-blur-md px-6 py-4 text-center">
                    <div className="bg-secondary text-secondary-content p-3.5 rounded-full shadow-lg mb-3 animate-bounce shrink-0">
                        <FiLock size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1.5 tracking-tight">Premium Developer Content Gated</h3>
                    <p className="text-xs sm:text-sm text-gray-400 max-w-sm mb-5 leading-relaxed">
                        Unlock this execution framework along with full architectural guides by configuring a standard access pipeline.
                    </p>
                    <Link
                        href={'/pricing'}
                        className="btn btn-secondary btn-md sm:btn-md px-8 shadow-xl rounded-xl font-bold transition-transform hover:scale-105 active:scale-95 shrink-0"
                    >
                        Subscribe to Premium
                    </Link>
                </div>
            )}
        </motion.div>
    );
};

export default PromptContentCard;