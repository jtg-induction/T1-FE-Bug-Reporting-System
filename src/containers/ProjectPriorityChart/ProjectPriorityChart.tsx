import { useMemo, useState } from 'react';

import { useParams } from 'react-router-dom';

import { SelectChangeEvent, Typography } from '@mui/material';

import { ChartFilter, PriorityBarChart, SectionCard } from '@components';
import { useGetProjectMembersQuery, useGetProjectSummaryQuery } from '@service';
import { getEndOfCurrentWeek, getStartOfCurrentWeek } from '@utils';

import { PRIORITY_MAP } from './ProjectPriorityChart.config';

export const ProjectPriorityChartContainer = () => {
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
                      section: 'priority',
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
            titleContent={
                <Typography variant="h6" fontWeight="bold">
                    Tickets by Priority
                </Typography>
            }
            subheaderContent={
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
            mainContent={
                <PriorityBarChart
                    data={chartData}
                    isLoading={isSummaryFetching}
                />
            }
        />
    );
};
