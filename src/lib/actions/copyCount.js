const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const incrementCopyCount = async (promptId) => {
    const res = await fetch(`${baseUrl}/api/prompts/increment-copy`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ promptId })
    });

    return res.json();
}