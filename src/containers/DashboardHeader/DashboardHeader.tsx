import { PageHeader } from '@components';
import { useGetMeQuery } from '@service';

export const DashboardHeader = () => {
    const { data: currentUser } = useGetMeQuery();
    const userData = currentUser?.data;

    const title = 'Dashboard';
    const subtitle = userData?.first_name
        ? `Welcome back, ${userData.first_name}! Let's get started.`
        : "Welcome back! Here's what's happening in your projects.";

    return <PageHeader title={title} subtitle={subtitle} />;
};
