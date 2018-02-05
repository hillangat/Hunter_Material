import { JsonObject, JsonProperty } from 'json2typescript';


@JsonObject
export class TaskGroup {
    @JsonProperty( 'groupId', Number )
    public groupId: number;
    @JsonProperty( 'ownerUserName', String )
    public ownerUserName: string;
    @JsonProperty( 'groupName', String )
    public groupName: string;
    @JsonProperty( 'groupDesc', String )
    public groupDesc: string;
    @JsonProperty( 'receiverCount', Number )
    public receiverCount: number;
    @JsonProperty( 'receiverType', String )
    public receiverType: string;
    @JsonProperty( 'receiverGroupReceiversIds', [Number] )
    public receiverGroupReceiversIds: number[];
    @JsonProperty( 'cretDate', Number )
    public cretDate: Number;
    @JsonProperty( 'createdBy', String )
    public createdBy: string;
    @JsonProperty( 'lastUpdate', Number )
    public lastUpdate: Number;
    @JsonProperty( 'lastUpdatedBy', String )
    public lastUpdatedBy: string;
}
