import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class AuditInfo {
    @JsonProperty( 'cretDate', Date )
    public cretDate: Date;
    @JsonProperty( 'createdBy', String )
    public createdBy: string;
    @JsonProperty( 'lastUpdate', String )
    public lastUpdate: Date;
    @JsonProperty( 'lastUpdatedBy', String )
    public lastUpdatedBy: string;
}

