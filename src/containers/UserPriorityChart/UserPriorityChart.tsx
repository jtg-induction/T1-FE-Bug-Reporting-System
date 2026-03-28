import { useMemo, useState } from 'react';

import { useParams } from 'react-router-dom';

import { Typography } from '@mui/material';

import {
    ChartFilter,
    ChartFilterState,
    PriorityBarChart,
    SectionCard,
} from '@components';
import { useGetUserSummaryQuery } from '@service';
import { getEndOfCurrentWeek, getStartOfCurrentWeek } from '@utils';

import { PRIORITY_MAP } from './UserPriorityChart.config';

export const UserPriorityChartContainer = () => {
    const { userId } = useParams<{ userId: string }>();

    const [appliedFilters, setAppliedFilters] = useState<ChartFilterState>({
        selectedUserIds: ['all'],
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
                      section: 'priority',
                      startDate: appliedFilters.startDate,
                      endDate: appliedFilters.endDate,
                  },
            { skip: !userId },
        );

    const chartData = useMemo(() => {
        const severityData = summaryResponse?.data?.ticket_severity;

        return [
            {
                name: PRIORITY_MAP[1].name,
                count: severityData?.lowest || 0,
                color: PRIORITY_MAP[1].color,
            },
            {
                name: PRIORITY_MAP[2].name,
                count: severityData?.low || 0,
                color: PRIORITY_MAP[2].color,
            },
            {
                name: PRIORITY_MAP[3].name,
                count: severityData?.medium || 0,
                color: PRIORITY_MAP[3].color,
            },
            {
                name: PRIORITY_MAP[4].name,
                count: severityData?.high || 0,
                color: PRIORITY_MAP[4].color,
            },
            {
                name: PRIORITY_MAP[5].name,
                count: severityData?.highest || 0,
                color: PRIORITY_MAP[5].color,
            },
        ];
    }, [summaryResponse]);

    const handleFilterApply = (newFilters: ChartFilterState) => {
        setAppliedFilters(newFilters);
    };

    return (
        <SectionCard
            titleContent={
                <Typography variant="h6" fontWeight="bold">
                    Tickets by Priority
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
                <PriorityBarChart
                    data={chartData}
                    isLoading={isSummaryFetching}
                />
            }
        />
    );
};
