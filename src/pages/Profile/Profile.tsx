import { useParams } from 'react-router-dom';
import { hideSnackbar } from 'redux/features/profileSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';

import { Snackbar } from '@components';
import {
    ProfileFormContainer,
    ProfileHeaderContainer,
    UserReportContainer,
} from '@containers';
import { NotFoundPage } from '@pages/NotFoundPage';
import {
    useGetMeQuery,
    useGetUserQuery,
    useUpdateUserMutation,
} from '@service';

import {
    ContentContainer,
    MainWrapper,
    ReportContainer,
} from './Profile.styles';

export const ProfilePage = () => {
    const { userId } = useParams<{ userId: string }>();
    const dispatch = useAppDispatch();
    const { snackbar } = useAppSelector((state) => state.profile);

    const { data: getMeResponse } = useGetMeQuery();
    const currentUser = getMeResponse?.data;
    const [, { isLoading: isUpdatingUser }] = useUpdateUserMutation();

    const { data: getUserResponse, error } = useGetUserQuery(userId || '', {
        skip: !userId || userId === currentUser?.id,
    });

    const user = getUserResponse?.data;
    const activeUser = userId === currentUser?.id ? currentUser : user;
    const isEditable = Boolean(user?.can_edit || currentUser?.id === userId);

    if (error) return <NotFoundPage />;

    return (
        <MainWrapper>
            <ContentContainer>
                <ProfileHeaderContainer
                    isUpdatingUser={isUpdatingUser}
                    isEditable={isEditable}
                />
                <ProfileFormContainer
                    userId={userId}
                    activeUser={activeUser}
                    displayEmail={activeUser?.email || ''}
                    isEditable={isEditable}
                />
                <Snackbar
                    open={snackbar.open}
                    message={snackbar.message}
                    severity={snackbar.severity}
                    onClose={() => dispatch(hideSnackbar())}
                />
            </ContentContainer>
            <ReportContainer>
                <UserReportContainer />
            </ReportContainer>
        </MainWrapper>
    );
};
