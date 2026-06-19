import { serverFetch } from "../core/server"

export const getPrompts = async () => {
    return serverFetch('/api/prompts');
}