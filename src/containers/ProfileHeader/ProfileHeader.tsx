import {
    setEditStatus,
    triggerCancel,
    triggerSubmit,
} from 'redux/features/profileSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';

import { Edit, Save } from '@mui/icons-material';
import { Button } from '@mui/material';

import { PageHeader } from '@components';

import { ActionIconButton, SaveButton } from './ProfileHeader.styles';
import { HeaderProps } from './ProfileHeader.types';

export const ProfileHeaderContainer = ({
    isUpdatingUser,
    isEditable,
}: HeaderProps) => {
    const dispatch = useAppDispatch();
    const { editStatus, isFormDirty } = useAppSelector(
        (state) => state.profile,
    );

    const title = isEditable ? 'Account Settings' : 'User Profile';
    const subtitle = isEditable
        ? 'Manage your public profile and personal information.'
        : 'User Details';

    const renderActions = () => {
        if (!isEditable) return null;

        return !editStatus ? (
            <ActionIconButton
                onClick={() => dispatch(setEditStatus(true))}
                startIcon={<Edit />}
            >
                Edit Profile
            </ActionIconButton>
        ) : (
            <>
                <Button
                    onClick={onCancel}
                    color="inherit"
                    disabled={isUpdatingUser}
                >
                    {!editStatus ? (
                        <ActionIconButton
                            onClick={() => dispatch(setEditStatus(true))}
                            startIcon={<Edit />}
                        >
                            Edit Profile
                        </ActionIconButton>
                    ) : (
                        <>
                            <Button
                                onClick={() => dispatch(triggerCancel())}
                                color="inherit"
                                disabled={isUpdatingUser}
                            >
                                Cancel
                            </Button>
                            <SaveButton
                                onClick={() => dispatch(triggerSubmit())}
                                variant="contained"
                                disabled={isUpdatingUser || !isFormDirty}
                                startIcon={<Save />}
                            >
                                Save Changes
                            </SaveButton>
                        </>
                    )}
                </Stack>
            )}
        </HeaderContainer>
    );
};
