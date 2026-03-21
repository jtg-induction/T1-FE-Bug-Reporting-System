import { useMemo, useState } from 'react';

import { useParams } from 'react-router-dom';

import { Typography } from '@mui/material';

import {
    ChartFilter,
    ChartFilterState,
    DeadlineLineChart,
    SectionCard,
} from '@components';
import { useGetUserSummaryQuery } from '@service';
import { getEndOfCurrentWeek, getStartOfCurrentWeek } from '@utils';

export const UserDeadlineChartContainer = () => {
    const { userId } = useParams<{ userId: string }>();

    const [appliedFilters, setAppliedFilters] = useState<ChartFilterState>({
        dateRangeType: 'week',
        startDate: getStartOfCurrentWeek(),
        endDate: getEndOfCurrentWeek(),
    });

    const isDefaultFilter = appliedFilters.dateRangeType === 'week';

    const { data: summaryResponse, isFetching: isSummaryFetching } =
        useGetUserSummaryQuery(
            isDefaultFilter
                ? { userId: userId || '' }
                : {
                      userId: userId || '',
                      section: 'deadline',
                      startDate: appliedFilters.startDate,
                      endDate: appliedFilters.endDate,
                  },
            { skip: !userId },
        );

    const deadlineChartData = useMemo(() => {
        const deadlineData = summaryResponse?.data?.deadline_chart;

        if (!deadlineData) return [];

        return deadlineData.map((item) => ({
            date: item.day ? item.day.split('T')[0] : 'Unknown Date',
            missed: item.missed || 0,
            completedBefore: item.completedBefore || 0,
            closed: item.closed || 0,
        }));
    }, [summaryResponse]);

    const handleFilterApply = (newFilters: ChartFilterState) => {
        setAppliedFilters(newFilters);
    };

    return (
        <SectionCard
            titleContent={
                <Typography variant="h6" fontWeight="bold">
                    Ticket Deadlines
                </Typography>
            }
            subheaderContent={
                <ChartFilter
                    showUserFilter={false}
                    initialFilters={appliedFilters}
                    onApply={handleFilterApply}
                />
            }
            mainContent={
                <DeadlineLineChart
                    data={deadlineChartData}
                    isLoading={isSummaryFetching}
                />
            }
        />
    );
};
