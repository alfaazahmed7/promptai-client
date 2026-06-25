import React from 'react';
import { getBookmarkByEmail } from '@/lib/api/bookmark';
import { getPromptById } from '@/lib/api/prompts';
import { getUserSession } from '@/lib/core/session';
import SavedPromptsList from '@/components/dashboard/user-dashboard/SavedPromptsList';

const SavedPromptsPage = async () => {
    const user = await getUserSession();
    const bookmarks = await getBookmarkByEmail(user?.email) || [];

    // Run parallel server tasks
    const mappedPrompts = await Promise.all(
        bookmarks.map(async (bookmark) => {
            try {
                const promptId = bookmark.promptId?.$oid || bookmark.promptId;
                const promptData = await getPromptById(promptId);

                const savedDate = bookmark.createdAt?.$date
                    ? new Date(bookmark.createdAt.$date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                    : 'Recently';

                return {
                    bookmarkId: bookmark._id?.$oid || bookmark._id,
                    savedDate,
                    ...promptData
                };
            } catch (error) {
                console.error(`Failed to map template token background:`, error);
                return null;
            }
        })
    );

    const cleanPrompts = mappedPrompts.filter(prompt => prompt !== null);

    return (
        <div className="min-h-screen max-w-7xl mx-auto bg-[#0b0f19] text-slate-100 p-4 sm:p-6 lg:p-8">
            {/* Page Title Dashboard Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-slate-800/50">
                <div>
                    <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
                        Saved Prompts
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                        Your curated list of bookmarked tools and configuration setups.
                    </p>
                </div>

                <div className="bg-slate-900/40 px-3 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-400">
                    Total: <span className="text-violet-400 font-medium">{cleanPrompts.length}</span>
                </div>
            </div>

            {/* Client Component displaying states and cards map */}
            <SavedPromptsList initialPrompts={cleanPrompts} />
        </div>
    );
};

export default SavedPromptsPage;