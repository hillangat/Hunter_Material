import { Provider } from './provider';

export interface TextMessage {
    toPhone: null,
    pageWordCount: number;
    fromPhone: string;
    pageable: boolean;
    text: string;
    disclaimer: string;
    provider: Provider;
    msgDeliveryStatus: string;
    actualReceivers: number;
    confirmedReceivers: number;
    desiredReceivers: number;
    msgId: number;
    msgLifeStatus: string;
    msgText: string;
    createdBy: string;
    lastUpdate: string;
    lastUpdatedBy: string;
    cretDate: string;
    msgOwner: string;
    msgSendDate: string;
    msgTaskType: string;
}
