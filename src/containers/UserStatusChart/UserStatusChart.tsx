import { useMemo, useState } from 'react';

import { useParams } from 'react-router-dom';

import { Typography } from '@mui/material';

import {
    ChartFilter,
    ChartFilterState,
    SectionCard,
    StatusDonutChart,
} from '@components';
import { useGetUserSummaryQuery } from '@service';
import { getEndOfCurrentWeek, getStartOfCurrentWeek } from '@utils';

import { TICKET_STATUS_MAP } from './UserStatusChart.config';

export const UserStatusChartContainer = () => {
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
                      section: 'status',
                      startDate: appliedFilters.startDate,
                      endDate: appliedFilters.endDate,
                  },
            { skip: !userId },
        );

    const statusChartData = useMemo(() => {
        const statusData = summaryResponse?.data?.ticket_status;

        return [
            {
                name: TICKET_STATUS_MAP[1].name,
                value: statusData?.open || 0,
                color: TICKET_STATUS_MAP[1].color,
            },
            {
                name: TICKET_STATUS_MAP[2].name,
                value: statusData?.in_progress || 0,
                color: TICKET_STATUS_MAP[2].color,
            },
            {
                name: TICKET_STATUS_MAP[3].name,
                value: statusData?.resolved || 0,
                color: TICKET_STATUS_MAP[3].color,
            },
            {
                name: TICKET_STATUS_MAP[4].name,
                value: statusData?.closed || 0,
                color: TICKET_STATUS_MAP[4].color,
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
                    User Tickets by Status
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
                <StatusDonutChart
                    data={statusChartData}
                    isLoading={isSummaryFetching}
                />
            }
        />
    );
};
