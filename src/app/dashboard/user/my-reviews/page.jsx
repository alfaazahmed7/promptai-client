import React from 'react';
import { getReviewsByEmail } from '@/lib/api/review';
import { getPromptById } from '@/lib/api/prompts'; // Assuming this maps context titles
import { getUserSession } from '@/lib/core/session';
import MyReviewsList from '@/components/dashboard/user-dashboard/MyReviewsList';

const MyReviewsPage = async () => {
    const user = await getUserSession();
    const reviews = await getReviewsByEmail(user?.email) || [];

    // Parallel processing to grab matching visual context strings for targets
    const mappedReviews = await Promise.all(
        reviews.map(async (review) => {
            try {
                const promptId = review.promptId?.$oid || review.promptId;

                // Fetch template metadata titles asynchronously
                let promptTitle = "AI System Asset Layout";
                if (promptId) {
                    const promptData = await getPromptById(promptId);
                    if (promptData?.title) promptTitle = promptData.title;
                }

                const reviewDate = review.createdAt?.$date
                    ? new Date(review.createdAt.$date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                    : 'Recently';

                return {
                    reviewId: review._id?.$oid || review._id,
                    reviewDate,
                    promptId,
                    promptTitle,
                    rating: review.rating || 5,
                    comment: review.comment || ""
                };
            } catch (error) {
                console.error("Failed handling review item iteration background context maps:", error);
                return null;
            }
        })
    );

    const cleanReviews = mappedReviews.filter(review => review !== null);

    return (
        <div className="min-h-screen bg-[#0b0f19] text-slate-100 p-4 sm:p-6 lg:p-8">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-slate-800/50">
                <div>
                    <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
                        My Reviews
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                        Track and control the evaluation ratings given to global community creators.
                    </p>
                </div>
                <div className="bg-slate-900/40 px-3 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-400">
                    Submissions: <span className="text-violet-400 font-medium">{cleanReviews.length}</span>
                </div>
            </div>

            {/* Grid display layer initialization */}
            <MyReviewsList
                initialReviews={cleanReviews}
            />
        </div>
    );
};

export default MyReviewsPage;