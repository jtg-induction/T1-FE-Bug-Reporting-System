import { useMemo, useState } from 'react';

import { useParams } from 'react-router-dom';

import { SelectChangeEvent, Typography } from '@mui/material';

import { ChartFilter,DeadlineLineChart, SectionCard } from '@components';
import { useGetProjectMembersQuery, useGetProjectSummaryQuery } from '@service';
import { getEndOfCurrentWeek, getStartOfCurrentWeek } from '@utils';

export const ProjectDeadlineChartContainer = () => {
    const { id: projectId } = useParams<{ id: string }>();

    const [dateRangeType, setDateRangeType] = useState<string>('week');
    const [startDate, setStartDate] = useState<string>(getStartOfCurrentWeek());
    const [endDate, setEndDate] = useState<string>(getEndOfCurrentWeek());
    const [userIds, setUserIds] = useState<string[]>(['all']);

    const isDefaultFilter =
        dateRangeType === 'week' &&
        userIds.length === 1 &&
        userIds[0] === 'all';

    const { data: membersResponse } = useGetProjectMembersQuery(
        { projectId: projectId || '', limit: 100, offset: 0 },
        { skip: !projectId },
    );

    const { data: summaryResponse, isFetching: isSummaryFetching } =
        useGetProjectSummaryQuery(
            isDefaultFilter
                ? { projectId: projectId || '' }
                : {
                      projectId: projectId || '',
                      section: 'deadline',
                      userIds,
                      startDate,
                      endDate,
                  },
            { skip: !projectId },
        );

    const filterUsers = useMemo(() => {
        const membersData = membersResponse?.data;
        const results = membersData?.results ?? [];

        return results.map((row) => ({
            id: row.member.id,
            name: `${row.member.first_name} ${row.member.last_name}`.trim(),
        }));
    }, [membersResponse]);

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

    const handleUserChange = (event: SelectChangeEvent<typeof userIds>) => {
        const value = event.target.value;
        let newSelection = typeof value === 'string' ? value.split(',') : value;

        if (newSelection[newSelection.length - 1] === 'all') {
            newSelection = ['all'];
        } else {
            newSelection = newSelection.filter((id) => id !== 'all');
        }
        if (newSelection.length === 0) newSelection = ['all'];
        setUserIds(newSelection);
    };

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
                    showUserFilter={true}
                    users={filterUsers}
                    selectedUserIds={userIds}
                    onUserChange={handleUserChange}
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
