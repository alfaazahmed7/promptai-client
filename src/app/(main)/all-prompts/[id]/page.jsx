import React from 'react';
import { notFound } from 'next/navigation';
import PromptHeader from '@/components/all-prompts/prompt-details/PromptHeader';
import InteractionBar from '@/components/all-prompts/prompt-details/InteractionBar';
import PromptContentCard from '@/components/all-prompts/prompt-details/PromptComponentCard';
import ReviewSystem from '@/components/all-prompts/prompt-details/ReviewSystem';
import { getPromptById } from '@/lib/api/prompts';
import { getUserSession } from '@/lib/core/session';
import { getReviewById } from '@/lib/api/review';
import UsersReviews from '@/components/all-prompts/prompt-details/UsersReviews';
import { getBookmarkByIdAndEmail } from '@/lib/api/bookmark';

const PromptDetailsPage = async ({ params }) => {
    const resolvedParams = await params;
    const promptId = resolvedParams.id;

    // Fetch prompt details & user state
    const prompt = await getPromptById(promptId);
    const user = await getUserSession();

    if (!prompt) {
        notFound();
    }

    // Safety logic logic check
    const isPremiumTier = prompt.tier === 'premium';
    const hasPremiumAccess = user?.plan === 'pro';
    const isLocked = isPremiumTier && !hasPremiumAccess;

    const bookmark = await getBookmarkByIdAndEmail(promptId, user?.email);
    const reviewsData = await getReviewById(promptId);

    return (
        <div className="min-h-screen bg-[#121824] text-white pb-16 pt-[96px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-8 pt-6">

                {/* Meta Header */}
                <PromptHeader prompt={prompt} />

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* Left & Center: Prompt Actions & Source Text */}
                    <div className="lg:col-span-2 space-y-6">
                        <InteractionBar
                            promptId={prompt._id}
                            initialBookmarked={bookmark?.promptId?.includes(promptId) || false}
                            initialCopyCount={prompt.copyCount || 0}
                            isLocked={isLocked}
                        />

                        <PromptContentCard
                            prompt={prompt}
                            isLocked={isLocked}
                        />

                        <UsersReviews
                            reviews={reviewsData || []}
                            user={user}
                            isLocked={isLocked}
                        />
                    </div>

                    {/* Right Column: Usage Rules & Reviews */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* FIXED CONTAINER: Replaced bg-base-200 with matching card layout color */}
                        <div className="bg-[#161f30] p-6 rounded-2xl border border-gray-700/40 shadow-xl">
                            <h3 className="font-bold text-lg mb-3 text-secondary flex items-center gap-2">
                                <span>Usage Instructions</span>
                            </h3>

                            {!isLocked ? (
                                <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                                    {prompt.usageInstructions || "No explicit instructions provided."}
                                </p>
                            ) : (
                                /* FIXED LOCKED BANNER: Swapped dynamic colors for static variations */
                                <div className="flex items-center gap-3 p-3 bg-[#1e293b] rounded-xl border border-gray-700/40">
                                    <span className="p-2 rounded-lg bg-amber-500/10 text-amber-500 text-sm">🔒</span>
                                    <p className="text-xs text-gray-400">
                                        <span className="font-bold block text-white text-sm">Instructions Gated</span>
                                        Subscribe to premium to view the deployment strategy.
                                    </p>
                                </div>
                            )}
                        </div>

                        <ReviewSystem
                            promptId={prompt._id}
                            reviews={reviewsData || []}
                            isLocked={isLocked}
                            user={user}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromptDetailsPage;