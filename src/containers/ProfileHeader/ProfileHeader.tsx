import {
    setEditStatus,
    triggerCancel,
    triggerSubmit,
} from 'redux/features/profileSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';

import { Edit, Save } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';

import {
    ActionIconButton,
    HeaderContainer,
    PageTitle,
    SaveButton,
} from './ProfileHeader.styles';
import { HeaderProps } from './ProfileHeader.types';

export const ProfileHeaderContainer = ({
    isUpdatingUser,
    isEditable,
}: HeaderProps) => {
    const dispatch = useAppDispatch();
    const { editStatus, isFormDirty } = useAppSelector(
        (state) => state.profile,
    );

    return (
        <HeaderContainer>
            <Box width="100%">
                <PageTitle>
                    {isEditable ? 'Account Settings' : 'User Profile'}
                </PageTitle>
                <Typography
                    variant="h6"
                    color="text.secondary"
                    mt={2}
                    fontWeight={400}
                    fontSize={16}
                >
                    {isEditable
                        ? 'Manage your public profile and personal information.'
                        : 'User Details'}
                </Typography>
            </Box>

            {isEditable && (
                <Stack
                    direction="row"
                    spacing={2}
                    width="100%"
                    justifyContent="end"
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
