import { JsonProperty } from 'json2typescript/src/json2typescript/json-convert-decorators';
import { JsonObject } from 'json2typescript/src/json2typescript/json-convert-decorators';

export enum ServerStatusesEnum {
    Success = 'Success',
    Failed = 'Failed',
    Status = 'Status'
}

@JsonObject
export class ServerStatusResponse {
    @JsonProperty( 'status',  ServerStatusesEnum )
    public status: ServerStatusesEnum;
    @JsonProperty( 'message',  String )
    public message: string;
}


