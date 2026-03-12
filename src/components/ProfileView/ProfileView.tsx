import { Controller } from 'react-hook-form';

import { Edit, Save } from '@mui/icons-material';
import {
    Box,
    Button,
    Divider,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import { Snackbar } from '@components/Snackbar';
import { DESIGNATIONS } from '@pages/SignupComplete/SignupComplete.config';

import * as S from './ProfileView.style';
import { ProfileViewProps } from './ProfileView.types';

export const ProfileView = ({
    form,
    editStatus,
    setEditStatus,
    isUpdatingUser,
    isEditable,
    onSave,
    onCancel,
    snackbar,
    onSnackbarClose,
    displayEmail,
}: ProfileViewProps) => {
    // --- 1. LOCAL VARIABLES ---
    const {
        control,
        formState: { errors, isDirty },
    } = form;
    const inputVariant = editStatus ? 'outlined' : 'filled';

    return (
        <S.MainWrapper>
            <S.ContentContainer>
                <form onSubmit={(e) => void onSave(e)}>
                    {isEditable && (
                        <S.HeaderContainer>
                            <Box width="100%">
                                <S.PageTitle>Account Settings</S.PageTitle>
                                <Typography
                                    variant="h6"
                                    color="text.secondary"
                                    mt={2}
                                    fontWeight={400}
                                    fontSize={16}
                                >
                                    Manage your public profile and personal
                                    information.
                                </Typography>
                            </Box>

                            <Stack
                                direction="row"
                                spacing={2}
                                width="100%"
                                justifyContent="end"
                            >
                                {!editStatus ? (
                                    <S.ActionIconButton
                                        onClick={() => setEditStatus(true)}
                                        startIcon={<Edit />}
                                    >
                                        Edit Profile
                                    </S.ActionIconButton>
                                ) : (
                                    <>
                                        <Button
                                            onClick={onCancel}
                                            color="inherit"
                                            sx={(theme) => ({
                                                fontWeight: 700,
                                                fontSize:
                                                    theme.typography.pxToRem(
                                                        12,
                                                    ),
                                                [theme.breakpoints.up('md')]: {
                                                    fontSize:
                                                        theme.typography.pxToRem(
                                                            16,
                                                        ),
                                                },
                                            })}
                                            disabled={isUpdatingUser}
                                        >
                                            Cancel
                                        </Button>
                                        <S.SaveButton
                                            type="submit"
                                            variant="contained"
                                            disableElevation
                                            disabled={
                                                isUpdatingUser || !isDirty
                                            }
                                            startIcon={<Save />}
                                        >
                                            Save Changes
                                        </S.SaveButton>
                                    </>
                                )}
                            </Stack>
                        </S.HeaderContainer>
                    )}

                    <S.StyledSection>
                        <S.FormGridStack spacing={8}>
                            {/* Personal Info Section */}
                            <Box>
                                <S.SectionLabel>
                                    Personal Information
                                </S.SectionLabel>
                                <Stack
                                    direction={{ xs: 'column', md: 'row' }}
                                    spacing={4}
                                >
                                    <Controller
                                        name="first_name"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                required
                                                fullWidth
                                                label="First Name"
                                                variant={inputVariant}
                                                slotProps={{
                                                    input: {
                                                        readOnly: !editStatus,
                                                    },
                                                }}
                                                error={!!errors.first_name}
                                                helperText={
                                                    errors.first_name?.message
                                                }
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="last_name"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                required
                                                fullWidth
                                                label="Last Name"
                                                variant={inputVariant}
                                                slotProps={{
                                                    input: {
                                                        readOnly: !editStatus,
                                                    },
                                                }}
                                                error={!!errors.last_name}
                                                helperText={
                                                    errors.last_name?.message
                                                }
                                            />
                                        )}
                                    />
                                </Stack>
                            </Box>

                            <Divider />

                            {/* Professional Info Section */}
                            <Box>
                                <S.SectionLabel>
                                    Contact & Professional
                                </S.SectionLabel>
                                <Stack
                                    direction={{ xs: 'column', md: 'row' }}
                                    spacing={4}
                                    sx={{ mb: 4 }}
                                >
                                    <Controller
                                        name="designation"
                                        control={control}
                                        render={({ field }) => {
                                            const selectedOption =
                                                DESIGNATIONS.find(
                                                    (opt) =>
                                                        opt.value ===
                                                        field.value,
                                                );
                                            const displayValue = editStatus
                                                ? field.value
                                                : selectedOption?.label ||
                                                  field.value;

                                            return (
                                                <TextField
                                                    {...field}
                                                    value={displayValue}
                                                    required
                                                    fullWidth
                                                    select={editStatus}
                                                    label="Designation"
                                                    variant={inputVariant}
                                                    slotProps={{
                                                        input: {
                                                            readOnly:
                                                                !editStatus,
                                                        },
                                                    }}
                                                    error={!!errors.designation}
                                                    helperText={
                                                        errors.designation
                                                            ?.message
                                                    }
                                                >
                                                    {editStatus &&
                                                        DESIGNATIONS.map(
                                                            (option) => (
                                                                <MenuItem
                                                                    key={
                                                                        option.value
                                                                    }
                                                                    value={
                                                                        option.value
                                                                    }
                                                                >
                                                                    {
                                                                        option.label
                                                                    }
                                                                </MenuItem>
                                                            ),
                                                        )}
                                                </TextField>
                                            );
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Email Address"
                                        variant="filled"
                                        value={displayEmail}
                                        multiline
                                        slotProps={{
                                            input: { readOnly: true },
                                            inputLabel: { shrink: true },
                                        }}
                                        helperText={
                                            editStatus
                                                ? 'Email is managed via system settings'
                                                : ''
                                        }
                                    />
                                </Stack>

                                <Stack
                                    direction={{ xs: 'column', md: 'row' }}
                                    spacing={4}
                                >
                                    <Controller
                                        name="date_of_birth"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                type="date"
                                                label="Date of Birth"
                                                variant={inputVariant}
                                                slotProps={{
                                                    input: {
                                                        readOnly: !editStatus,
                                                    },
                                                    inputLabel: {
                                                        shrink: true,
                                                    },
                                                }}
                                                error={!!errors.date_of_birth}
                                                helperText={
                                                    errors.date_of_birth
                                                        ?.message
                                                }
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="phone"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                label="Phone Number"
                                                variant={inputVariant}
                                                slotProps={{
                                                    input: {
                                                        readOnly: !editStatus,
                                                    },
                                                }}
                                                error={!!errors.phone}
                                                helperText={
                                                    errors.phone?.message
                                                }
                                            />
                                        )}
                                    />
                                </Stack>
                            </Box>
                        </S.FormGridStack>
                    </S.StyledSection>
                </form>

                {/* <Snackbar
                    open={snackbar.open}
                    autoHideDuration={4000}
                    onClose={onSnackbarClose}
                >
                    <Alert
                        onClose={onSnackbarClose}
                        severity={snackbar.severity || 'success'}
                        variant="filled"
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar> */}
                <Snackbar
                    open={snackbar.open}
                    message={snackbar.message}
                    onClose={onSnackbarClose}
                    severity={snackbar.severity}
                ></Snackbar>
            </S.ContentContainer>
        </S.MainWrapper>
    );
};
