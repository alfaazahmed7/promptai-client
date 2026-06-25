import { serverFetch } from "../core/server"

export const getReviewById = async (promptId) => {
    return serverFetch(`/api/review?promptId=${promptId}`);
}

export const getReviewsByEmail = async (userEmail) => {
    return serverFetch(`/api/reviews/${userEmail}`);
}