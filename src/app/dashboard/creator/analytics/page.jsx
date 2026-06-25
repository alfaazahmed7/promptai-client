import React from 'react';
import CreatorAnalytics from '@/components/dashboard/creator-dashboard/CreatorAnalytics';
import { getUserSession } from '@/lib/core/session';
import { getUserAddPrompts } from '@/lib/api/userAddPrompts';

const AnalyticsPage = async () => {
    // 1. Grab the logged-in user session safely on the server
    const session = await getUserSession();
    const userEmail = session?.email;

    // 2. Execute your database utility function using the real email string
    let liveDbPrompts = [];
    if (userEmail) {
        liveDbPrompts = await getUserAddPrompts(userEmail) || [];
    }

    // 3. Directly feed the true database records into your visual component
    return (
        <CreatorAnalytics userPromptsData={JSON.parse(JSON.stringify(liveDbPrompts))} />
    );
};

export default AnalyticsPage;