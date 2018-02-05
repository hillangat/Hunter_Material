import { JsonObject } from 'json2typescript';
import { JsonProperty } from 'json2typescript/src/json2typescript/json-convert-decorators';


@JsonObject
export class Clients {
    @JsonProperty( 'clientId', Number)
    public clientId: number;
    @JsonProperty( 'clientTotalBudget', Number)
    public clientTotalBudget: number;
    @JsonProperty( 'receiver', Boolean)
    public receiver: boolean;
    @JsonProperty( 'taskIds', [Number])
    public taskIds: number[];
    @JsonProperty( 'firstName', String)
    public firstName: string;
    @JsonProperty( 'lastName', String)
    public lastName: string;
    @JsonProperty( 'email', String)
    public email: string;
    @JsonProperty( 'userName', String)
    public userName: string;
    @JsonProperty( 'cretDate', String)
    public cretDate: string;
    @JsonProperty( 'lastUpdate', String)
    public lastUpdate: string;
    @JsonProperty( 'createdBy', String)
    public createdBy: string;
    @JsonProperty( 'lastUpdatedBy', String)
    public lastUpdatedBy: string;
}

