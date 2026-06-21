import { serverMutation } from "../core/server"

export const addReport = (reportData) => {
    return serverMutation('/api/report', reportData);
}