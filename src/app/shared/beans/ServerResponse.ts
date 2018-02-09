import { ServerStatusesEnum } from './server-status-response';
import { HunterTableConfig } from './hunter-table-configs';
import { JsonProperty, JsonObject, Any } from 'json2typescript';

@JsonObject
export class HunterServerResponse {
    @JsonProperty( 'status',  String )
    public status: string;
    @JsonProperty( 'total',  Number )
    public total: number;
    @JsonProperty( 'message',  String )
    public message: string;
    @JsonProperty( 'data',  [Any] )
    public data: any[];
    @JsonProperty( 'headers',  [HunterTableConfig] )
    public headers: HunterTableConfig[] | undefined;
}
