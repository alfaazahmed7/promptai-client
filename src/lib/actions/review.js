import { serverMutation } from "../core/server"

export const addReview = async (reviewData) => {
    return serverMutation('/api/review', reviewData);
}