import { useMemo, useState } from 'react';

import { useParams } from 'react-router-dom';

import { Typography } from '@mui/material';

import {
    ChartFilter,
    ChartFilterState,
    PriorityBarChart,
    SectionCard,
} from '@components';
import { useGetProjectMembersQuery, useGetProjectSummaryQuery } from '@service';
import { getEndOfCurrentWeek, getStartOfCurrentWeek } from '@utils';

import { PRIORITY_MAP } from './ProjectPriorityChart.config';

export const ProjectPriorityChartContainer = () => {
    const { id: projectId } = useParams<{ id: string }>();

    const [appliedFilters, setAppliedFilters] = useState<ChartFilterState>({
        selectedUserIds: ['all'],
        dateRangeType: 'week',
        startDate: getStartOfCurrentWeek(),
        endDate: getEndOfCurrentWeek(),
    });

    const isDefaultFilter =
        appliedFilters.dateRangeType === 'week' &&
        appliedFilters.selectedUserIds?.length === 1 &&
        appliedFilters.selectedUserIds[0] === 'all';

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
                      userIds: appliedFilters.selectedUserIds,
                      startDate: appliedFilters.startDate,
                      endDate: appliedFilters.endDate,
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
                    showUserFilter={true}
                    users={filterUsers}
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
