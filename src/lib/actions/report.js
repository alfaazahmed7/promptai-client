import { serverMutation } from "../core/server";
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const addReport = (reportData) => {
    return serverMutation('/api/report', reportData);
}

export const dismissReport = async (reportId, promptId) => {
    const res = await fetch(`${baseUrl}/api/dismiss-report`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reportId, promptId }),
    });

    return res.json();
}

export const warnReportedPrompt = async (reportId, promptId) => {
    const res = await fetch(`${baseUrl}/api/warn-reported-prompt`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reportId, promptId }),
    });

    return res.json();
}