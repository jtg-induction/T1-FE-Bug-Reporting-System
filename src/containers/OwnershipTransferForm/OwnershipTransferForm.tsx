import { useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { Stack, Typography } from '@mui/material';

import { FormField, ModalForm } from '@components';

import { OWNERSHIP_TRANSFER_FORM_CONFIG } from './OwnershipTransferForm.config';
import { TransferOwnershipFormContainerProps } from './OwnershipTransferForm.types';

export const TransferOwnershipFormContainer = ({
    open,
    onClose,
    onSubmit,
    isLoading,
    projectMemberOptions,
}: TransferOwnershipFormContainerProps) => {
    const { control, handleSubmit, reset } = useForm<{ newOwnerId: string }>({
        defaultValues: { newOwnerId: '' },
    });
    useEffect(() => {
        if (!open) reset();
        if (open && projectMemberOptions.length > 0)
            reset({ newOwnerId: projectMemberOptions[0].VALUE });
    }, [open, reset, projectMemberOptions]);

    const handleFormSubmit = async (data: { newOwnerId: string }) => {
        await onSubmit(data);
    };

    return (
        <ModalForm
            open={open}
            title={OWNERSHIP_TRANSFER_FORM_CONFIG.TITLE}
            formId={OWNERSHIP_TRANSFER_FORM_CONFIG.ID}
            onClose={onClose}
            isLoading={isLoading}
            submitLabel={OWNERSHIP_TRANSFER_FORM_CONFIG.SUBMIT_LABEL}
            showSubmit={projectMemberOptions.length > 0}
        >
            <form
                id={OWNERSHIP_TRANSFER_FORM_CONFIG.ID}
                onSubmit={(e) => void handleSubmit(handleFormSubmit)(e)}
            >
                {projectMemberOptions.length > 0 ? (
                    <Stack spacing={3}>
                        <Typography variant="body1">
                            As the project owner, you must transfer ownership to
                            another member before leaving.
                        </Typography>
                        <FormField
                            name="newOwnerId"
                            label="Select New Owner"
                            type="select"
                            control={control}
                            editStatus={true}
                            options={projectMemberOptions}
                        />
                    </Stack>
                ) : (
                    <>No Other Project Member to transfer ownership</>
                )}
            </form>
        </ModalForm>
    );
};
