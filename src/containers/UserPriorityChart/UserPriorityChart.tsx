import { useMemo, useState } from 'react';

import { useParams } from 'react-router-dom';

import { SelectChangeEvent, Typography } from '@mui/material';

import { ChartFilter, PriorityBarChart, SectionCard } from '@components';
import { useGetUserSummaryQuery } from '@service';
import { getEndOfCurrentWeek, getStartOfCurrentWeek } from '@utils';

import { PRIORITY_MAP } from './UserPriorityChart.config';

export const UserPriorityChartContainer = () => {
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
                      section: 'priority',
                      startDate,
                      endDate,
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
                    Tickets by Priority
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
                <PriorityBarChart
                    data={chartData}
                    isLoading={isSummaryFetching}
                />
            }
        />
    );
};
