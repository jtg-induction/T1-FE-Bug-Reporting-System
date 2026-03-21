import { useMemo, useState } from 'react';

import { useParams } from 'react-router-dom';

import { SelectChangeEvent, Typography } from '@mui/material';

import { ChartFilter, SectionCard, StatusDonutChart } from '@components';
import { useGetProjectMembersQuery, useGetProjectSummaryQuery } from '@service';
import { getEndOfCurrentWeek, getStartOfCurrentWeek } from '@utils';

import { TICKET_STATUS_MAP } from './ProjectStatusChart.config';

export const ProjectStatusChartContainer = () => {
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
                      section: 'status',
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
                    Tickets by Status
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
                <StatusDonutChart
                    data={statusChartData}
                    isLoading={isSummaryFetching}
                />
            }
        />
    );
};
