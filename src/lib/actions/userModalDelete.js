const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const DeletePromptById = async (promptId) => {
    const res = await fetch(`${baseUrl}/api/user-modal-delete/${promptId}`, {
        method: 'DELETE',
    });

    return res.json();
}