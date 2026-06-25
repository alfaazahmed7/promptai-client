import { serverMutation } from "../core/server"
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const addBookmark = async (bookmardData) => {
    return serverMutation('/api/bookmarks', bookmardData);
}

export const deleteBookmarkById = async (bookmarkId) => {
    const res = await fetch(`${baseUrl}/api/bookmark/${bookmarkId}`, {
        method: 'DELETE',
    });

    return res.json();
}