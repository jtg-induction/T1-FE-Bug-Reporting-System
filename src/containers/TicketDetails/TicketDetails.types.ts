import { TicketCreateResponse } from 'types/common';

import { TicketFormValues } from '@schemas';

export interface TicketViewProps {
    ticket: TicketCreateResponse;
    memberOptions: { LABEL: string; VALUE: string | number }[];
    permissions: { canEdit: boolean; canDelete: boolean; canClose: boolean };
    isUpdating: boolean;
    onUpdate: (values: TicketFormValues) => Promise<void>;
    onDelete: () => void;
    onSubscribe: () => void;
}
