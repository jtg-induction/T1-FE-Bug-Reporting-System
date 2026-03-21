import { PageHeader } from '@components';
import { useGetMeQuery } from '@service';

export const ProjectHeader = () => {
    const { data: currentUser } = useGetMeQuery();
    const userData = currentUser?.data;

    const title = 'Your Projects';
    const subtitle = userData?.first_name
        ? `Welcome back, ${userData.first_name}! Here's what's happening in your projects.`
        : "Welcome back! Here's what's happening in your projects.";

    return <PageHeader title={title} subtitle={subtitle} />;
};
