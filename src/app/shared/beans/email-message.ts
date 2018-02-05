import { JsonProperty } from 'json2typescript';
import { JsonObject } from 'json2typescript';

@JsonObject
export class EmailMessage {
    @JsonProperty( 'msgId', Number)
    public msgId: number;
    @JsonProperty( 'msgDeliveryStatus', String)
    public msgDeliveryStatus: string;
    @JsonProperty( 'msgLifeStatus', String)
    public msgLifeStatus: string;
    @JsonProperty( 'msgSendDate', String)
    public msgSendDate: string;
    @JsonProperty( 'msgTaskType', String)
    public msgTaskType: string;
    @JsonProperty( 'msgText', String)
    public msgText: string;
    @JsonProperty( 'desiredReceivers', Number)
    public desiredReceivers: number;
    @JsonProperty( 'actualReceivers', Number)
    public actualReceivers: number;
    @JsonProperty( 'confirmedReceivers', Number)
    public confirmedReceivers: number;
    @JsonProperty( 'msgOwner', String)
    public msgOwner: string;
    @JsonProperty( 'cretDate', Date)
    public cretDate: Date;
    @JsonProperty( 'lastUpdate', Date)
    public lastUpdate: Date;
    @JsonProperty( 'createdBy', String)
    public createdBy: string;
    @JsonProperty( 'lastUpdatedBy', String)
    public lastUpdatedBy: string;
    @JsonProperty( 'provider', Number)
    public provider: number;
}
