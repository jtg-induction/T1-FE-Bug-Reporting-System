import { useMemo, useState } from 'react';

import { useParams } from 'react-router-dom';

import { SelectChangeEvent, Typography } from '@mui/material';

import { ChartFilter, SectionCard, StatusDonutChart } from '@components';
import { useGetUserSummaryQuery } from '@service';
import { getEndOfCurrentWeek, getStartOfCurrentWeek } from '@utils';

import { TICKET_STATUS_MAP } from './UserStatusChart.config';

export const UserStatusChartContainer = () => {
    const { userId: userId } = useParams<{ userId: string }>();

    const [dateRangeType, setDateRangeType] = useState<string>('week');
    const [startDate, setStartDate] = useState<string>(getStartOfCurrentWeek());
    const [endDate, setEndDate] = useState<string>(getEndOfCurrentWeek());

    const isDefaultFilter = dateRangeType === 'week';

    const { data: summaryResponse, isFetching: isSummaryFetching } =
        useGetUserSummaryQuery(
            isDefaultFilter
                ? { userId: userId || '' }
                : {
                      userId: userId || '',
                      section: 'status',
                      startDate,
                      endDate,
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

    const handleDateRangeTypeChange = (event: SelectChangeEvent) => {
        const type = event.target.value;
        setDateRangeType(type);

        if (type === 'week') {
            setStartDate(getStartOfCurrentWeek());
            setEndDate(getEndOfCurrentWeek());
        } else if (type === 'all') {
            setStartDate('');
            setEndDate('');
        }
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
                    dateRangeType={dateRangeType}
                    onDateRangeTypeChange={handleDateRangeTypeChange}
                    startDate={startDate}
                    onStartDateChange={setStartDate}
                    endDate={endDate}
                    onEndDateChange={setEndDate}
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
