import { useMemo, useState } from 'react';

import { useParams } from 'react-router-dom';

import { SelectChangeEvent, Typography } from '@mui/material';

import { ChartFilter, DeadlineLineChart, SectionCard } from '@components';
import { useGetUserSummaryQuery } from '@service';
import { getEndOfCurrentWeek, getStartOfCurrentWeek } from '@utils';

export const UserDeadlineChartContainer = () => {
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
                      section: 'deadline',
                      startDate,
                      endDate,
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
            TitleContent={
                <Typography variant="h6" fontWeight="bold">
                    Ticket Deadlines
                </Typography>
            }
            SubheaderContent={
                <ChartFilter
                    dateRangeType={dateRangeType}
                    onDateRangeTypeChange={handleDateRangeTypeChange}
                    startDate={startDate}
                    onStartDateChange={setStartDate}
                    endDate={endDate}
                    onEndDateChange={setEndDate}
                />
            }
            MainContent={
                <DeadlineLineChart
                    data={deadlineChartData}
                    isLoading={isSummaryFetching}
                />
            }
        />
    );
};
