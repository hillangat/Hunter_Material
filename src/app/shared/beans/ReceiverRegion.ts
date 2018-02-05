import { JsonObject, JsonProperty } from 'json2typescript';
import { AuditInfo } from './AuditInfo';

@JsonObject
export class ReceiverRegion {
    @JsonProperty( 'regionId', Number )
    public regionId: number;
    @JsonProperty( 'country', String )
    public country: string;
    @JsonProperty( 'state', String )
    public state: string;
    @JsonProperty( 'hasState', Boolean )
    public hasState: boolean;
    @JsonProperty( 'county', String )
    public county: string;
    @JsonProperty( 'constituency', String )
    public constituency: string;
    @JsonProperty( 'city', String )
    public city: string;
    @JsonProperty( 'ward', String )
    public ward: string;
    @JsonProperty( 'village', String )
    public village: string;
    @JsonProperty( 'longitude', Number )
    public longitude: number;
    @JsonProperty( 'latitude', Number )
    public latitude: number;
    @JsonProperty( 'currentLevel', String )
    public currentLevel: string;
    @JsonProperty( 'borderLongLats', String )
    public borderLongLats: string;
    @JsonProperty( 'auditInfo', AuditInfo )
    public auditInfo: AuditInfo;
}
