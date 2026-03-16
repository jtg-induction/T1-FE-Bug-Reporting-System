import { useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { Stack, Typography } from '@mui/material';

import { FormField, ModalForm } from '@components';

import { TransferOwnershipFormContainerProps } from './OwnershipTransferForm.types';

export const TransferOwnershipFormContainer = ({
    open,
    onClose,
    onSubmit,
    isLoading,
    memberOptions,
}: TransferOwnershipFormContainerProps) => {
    const formId = 'transfer-owner-form';

    const { control, handleSubmit, reset } = useForm<{ newOwnerId: string }>({
        defaultValues: { newOwnerId: '' },
    });
    useEffect(() => {
        if (!open) reset();
    }, [open, reset]);

    const handleFormSubmit = async (data: { newOwnerId: string }) => {
        await onSubmit(data);
    };

    return (
        <ModalForm
            open={open}
            title="Transfer Ownership & Leave"
            formId={formId}
            onClose={onClose}
            isLoading={isLoading}
            submitLabel="Transfer & Leave"
        >
            <form
                id={formId}
                onSubmit={(e) => void handleSubmit(handleFormSubmit)(e)}
            >
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
                        options={memberOptions}
                    />
                </Stack>
            </form>
        </ModalForm>
    );
};
