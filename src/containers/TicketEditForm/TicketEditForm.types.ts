import { TicketCreateResponse } from 'types/common';

import { TicketFormValues } from '@schemas';

export interface TicketFormContainerProps {
    open: boolean;
    onClose: () => void;
    ticket: TicketCreateResponse & { permission_class: number };
    memberOptions: { LABEL: string; VALUE: string | number }[];
    onUpdate: (data: TicketFormValues) => Promise<void>;
    isLoading: boolean;
    isStatusOnly?: boolean;
}
