import { Provider } from './Provider';
import { MessageAttachmentMetadata } from './MessageAttachmentMetadata';
export class TaskMessage {
        public msgId: number;
        public msgDeliveryStatus: string;
        public msgLifeStatus: string;
        public msgSendDate: number;
        public msgTaskType: string;
        public msgText: string;
        public desiredReceivers: number;
        public actualReceivers: number;
        public confirmedReceivers: number;
        public msgOwner: string;
        public cretDate: number;
        public lastUpdate: number;
        public createdBy: string;
        public lastUpdatedBy: string;
        public provider: Provider;
        public eSubject: string;
        public eBody: string;
        public eFooter: string;
        public toList: string;
        public eFrom: string;
        public ccList: string;
        public multiPart: boolean;
        public hasAttachment: boolean;
        public attchmntBnId: number;
        public attchmtntFileType: string;
        public contentType: string;
        public cssObject: string;
        public replyTo: string;
        public priority: string;
        public emailTemplateName: string;
        public messageAttachments: string;
        public messageAttachmentMetadata: MessageAttachmentMetadata[]
}
