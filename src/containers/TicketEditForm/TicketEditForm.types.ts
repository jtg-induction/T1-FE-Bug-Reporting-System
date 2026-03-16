import { TicketCreateResponse } from "types/common";

import { TicketFormValues } from "@schemas";

export interface TicketFormContainerProps {
    open: boolean;
    onClose: () => void;
    ticket: TicketCreateResponse;
    memberOptions: { LABEL: string; VALUE: string | number }[];
    onUpdate: (data: TicketFormValues) => Promise<void>;
    isLoading: boolean;
    isStatusOnly?: boolean;
}