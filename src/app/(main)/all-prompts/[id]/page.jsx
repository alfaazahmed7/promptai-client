import React from 'react';
import { notFound } from 'next/navigation';
import PromptHeader from '@/components/all-prompts/prompt-details/PromptHeader';
import InteractionBar from '@/components/all-prompts/prompt-details/InteractionBar';
import PromptContentCard from '@/components/all-prompts/prompt-details/PromptComponentCard';
import ReviewSystem from '@/components/all-prompts/prompt-details/ReviewSystem';
import { getPromptById } from '@/lib/api/prompts';
import { getUserSession } from '@/lib/core/session';
import { addBookmark } from '@/lib/actions/bookmark';
import { getBookmark } from '@/lib/api/bookmark';
import { getReviewById } from '@/lib/api/review';
import UsersReviews from '@/components/all-prompts/prompt-details/UsersReviews';

const PromptDetailsPage = async ({ params }) => {
    const resolvedParams = await params;
    const promptId = resolvedParams.id;
    console.log(promptId, 'promptid');

    // Fetch prompt details & user state
    const prompt = await getPromptById(promptId);
    const user = await getUserSession();

    if (!prompt) {
        notFound();
    }

    // Safety logic logic check
    const isPremiumTier = prompt.tier === 'premium';
    const hasPremiumAccess = user?.isSubscribed || false;
    const isLocked = isPremiumTier && !hasPremiumAccess;

    const bookmark = await getBookmark(promptId);
    const reviewsData = await getReviewById(promptId);

    return (
        <div className="min-h-screen bg-base-300 text-base-content pb-16 pt-[96px] px-4 sm:px-6 lg:px-8">
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
                        <div className="bg-base-200 p-6 rounded-2xl border border-base-content/5 shadow-xl">
                            <h3 className="font-bold text-lg mb-3 text-secondary flex items-center gap-2">
                                <span>Usage Instructions</span>
                            </h3>

                            {!isLocked ? (
                                <p className="text-sm text-base-content/80 leading-relaxed whitespace-pre-wrap">
                                    {prompt.usageInstructions || "No explicit instructions provided."}
                                </p>
                            ) : (
                                <div className="flex items-center gap-3 p-3 bg-base-300/50 rounded-xl border border-base-content/5">
                                    <span className="p-2 rounded-lg bg-amber-500/10 text-amber-500 text-sm">🔒</span>
                                    <p className="text-xs text-base-content/70">
                                        <span className="font-bold block text-base-content text-sm">Instructions Gated</span>
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