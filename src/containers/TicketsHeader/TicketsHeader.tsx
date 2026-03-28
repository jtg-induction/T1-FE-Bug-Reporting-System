import { PageHeader } from '@components';
import { useGetMeQuery } from '@service';

export const TicketsHeader = () => {
    const { data: currentUser } = useGetMeQuery();
    const userData = currentUser?.data;

    const title = 'Your Tickets';
    const subtitle = userData?.first_name
        ? `Welcome back, ${userData.first_name}! Here's what's happening in your tickets.`
        : "Welcome back! Here's what's happening in your tickets.";

    return <PageHeader title={title} subtitle={subtitle} />;
};
