'use client';
import { addReview } from '@/lib/actions/review';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // 1. Import useRouter
import toast from 'react-hot-toast';
import { FiLock, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';

const ReviewSystem = ({ promptId, reviews = [], isLocked, user }) => {
    const router = useRouter();
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const hasUserReviewed = user?.email && reviews && reviews.some(rev => rev.email === user.email);

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (!user) return toast.error('You must sign in to submit evaluations.');
        if (isLocked) return toast.error('Action Restricted.');
        if (hasUserReviewed) return toast.error('You have already reviewed this prompt.');

        try {
            setIsSubmitting(true);
            const newReview = {
                email: user.email,
                rating: Number(rating),
                promptId: promptId,
                comment
            };

            await addReview(newReview);

            setComment('');
            toast.success('Review recorded successfully!');

            // 3. Silently request the Server Component layout to re-fetch data instantly
            router.refresh();

        } catch (err) {
            console.error(err);
            toast.error('Failed to submit review. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-[#161f30] p-6 rounded-2xl border border-gray-700/40 shadow-xl space-y-4 text-white">
            <h3 className="font-bold text-lg flex items-center gap-2 text-primary">
                <FiMessageSquare /> Feedback & Ratings
            </h3>

            {isLocked ? (
                <div className="p-4 bg-[#1a2333] rounded-xl text-center space-y-2 border border-dashed border-gray-700/50">
                    <FiLock className="mx-auto text-gray-500" size={20} />
                    <p className="text-xs text-gray-400 font-medium">Review console locked for free tier accounts.</p>
                </div>
            ) : hasUserReviewed ? (
                <div className="p-4 bg-success/10 text-success rounded-xl border border-success/20 flex items-center gap-3">
                    <FiCheckCircle size={20} className="shrink-0" />
                    <div>
                        <p className="text-sm font-semibold">You have reviewed this prompt</p>
                        <p className="text-xs opacity-80">Thank you for sharing your feedback with the community!</p>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmitReview} className="space-y-3">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-300">Your Rating:</span>
                        <div className="rating rating-sm gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <input
                                    key={star}
                                    type="radio"
                                    name="rating-star"
                                    className="mask mask-star-2 bg-orange-400"
                                    checked={rating === star}
                                    onChange={() => setRating(star)}
                                    disabled={isSubmitting}
                                />
                            ))}
                        </div>
                    </div>
                    <textarea
                        className="textarea textarea-bordered w-full h-20 text-sm rounded-xl focus:textarea-primary bg-[#1a2333] border-gray-700 text-white placeholder-gray-500 outline-none transition-all"
                        placeholder="Share your evaluation of this prompt's performance matrix..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                        disabled={isSubmitting}
                    />
                    <button type="submit" className="btn btn-sm btn-primary w-full rounded-xl" disabled={isSubmitting}>
                        {isSubmitting ? 'Publishing...' : 'Publish Review'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default ReviewSystem;