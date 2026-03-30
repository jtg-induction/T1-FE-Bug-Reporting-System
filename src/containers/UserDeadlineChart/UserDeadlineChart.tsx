import { useMemo, useState } from 'react';

import { useParams } from 'react-router-dom';

import { Typography } from '@mui/material';

import {
    ChartFilter,
    ChartFilterState,
    DeadlineChart,
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

        return deadlineData.map((item) => {
            let formattedDate = 'Unknown Date';

            if (item.day) {
                const datePart = item.day.split('T')[0];
                const [year, month, day] = datePart.split('-');
                formattedDate = `${month}/${day}/${year}`;
            }

            return {
                date: formattedDate,
                missed: item.missed || 0,
                completedBefore: item.completed_before_time || 0,
                completedOnTime: item.completed_on_time || 0,
            };
        });
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
                <DeadlineChart
                    data={deadlineChartData}
                    isLoading={isSummaryFetching}
                />
            }
        />
    );
};
