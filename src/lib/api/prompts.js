import { serverFetch } from "../core/server";

export const getPrompts = async (filters = {}) => {
    const { search, category, aiTool, sort } = filters;

    // 1. Initialize URLSearchParams to cleanly build the query string
    const params = new URLSearchParams();

    // 2. Append parameters dynamically only if they have a value
    if (search) params.append('search', search);
    if (category) params.append('category', category);
    if (aiTool) params.append('aiTool', aiTool);
    if (sort) params.append('sort', sort);

    // 3. Convert params to string format (e.g., "search=react&sort=popular")
    const queryString = params.toString();
    const endpoint = queryString ? `/api/prompts?${queryString}` : '/api/prompts';

    // 4. Execute the fetch using custom serverFetch utility
    return serverFetch(endpoint);
};

export const getPromptById = async (promptId) => {
    return serverFetch(`/api/prompts/${promptId}`);
}

export const getPromptsByEmail = async (userEmail) => {
    return serverFetch(`/api/prompts/user/${userEmail}`);
}