import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class Region {
    @JsonProperty( 'regionId', Number )
    public regionId: number;
    @JsonProperty( 'regionName', String )
    public regionName: string;
    @JsonProperty( 'population', Number )
    public population: number;
    @JsonProperty( 'regionDesc', String )
    public regionDesc: string;
    @JsonProperty( 'countryId', Number )
    public countryId: number;
    @JsonProperty( 'countyId', Number )
    public countyId: number;
    @JsonProperty( 'consId', Number )
    public consId: number;
    @JsonProperty( 'wardId', Number )
    public wardId: number;
    @JsonProperty( 'coordinates', String )
    public coordinates: string;
    @JsonProperty( 'assignedTo', String )
    public assignedTo: string;
    @JsonProperty( 'cretDate', String )
    public cretDate: string;
    @JsonProperty( 'createdBy', String )
    public createdBy: string;
    @JsonProperty( 'lastUpdate', String )
    public lastUpdate: string;
    @JsonProperty( 'lastUpdatedBy', String )
    public lastUpdatedBy: string;
}
