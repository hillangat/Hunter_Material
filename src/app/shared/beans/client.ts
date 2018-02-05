import { Region } from './region';
import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class Client {
  @JsonProperty( 'clientId', Number )
  public clientId: number;
  @JsonProperty( 'clientTotalBudget', Number )
  public clientTotalBudget: number;
  @JsonProperty( 'receiver', Boolean )
  public receiver: boolean;
  @JsonProperty( 'firstName', String )
  public firstName: string;
  @JsonProperty( 'lastName', String )
  public lastName: string;
  @JsonProperty( 'email', String )
  public email: string;
  @JsonProperty( 'userName', String )
  public userName: string;
  @JsonProperty( 'cretDate', String )
  public cretDate: string;
  @JsonProperty( 'updatedOn', String )
  public updatedOn: string;
  @JsonProperty( 'createdBy', String )
  public createdBy: string;
  @JsonProperty( 'lastUpdatedBy', String )
  public lastUpdatedBy: string;
}

