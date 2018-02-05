import { HunterTableConfig } from './hunter-table-config';
import { JsonObject, JsonProperty, Any } from 'json2typescript';

@JsonObject
export class AngularData {
    @JsonProperty( 'status', String )
    public status: string;
    @JsonProperty( 'message', String )
    public message: string;
    @JsonProperty( 'data', Any )
    public data: any;
    @JsonProperty( 'headers', HunterTableConfig )
    public headers: HunterTableConfig;
}

