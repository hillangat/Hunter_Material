import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class Country {
    @JsonProperty( 'countryId', Number )
    public countryId: number;
    @JsonProperty( 'countryName', String )
    public countryName: string;
    @JsonProperty( 'capital', String )
    public capital: string;
    @JsonProperty( 'hasState', Boolean )
    public hasState: boolean;
    @JsonProperty( 'hunterPopulation', Number )
    public hunterPopulation: number;
    @JsonProperty( 'countryPopulation', Number )
    public countryPopulation: number;
    @JsonProperty( 'countryCode', String )
    public countryCode: string;
    @JsonProperty( 'cretDate', String )
    public cretDate: string;
    @JsonProperty( 'createdBy', String )
    public createdBy: string;
    @JsonProperty( 'lastUpdate', String )
    public lastUpdate: string;
    @JsonProperty( 'lastUpdatedBy', String )
    public lastUpdatedBy: string;
}

@JsonObject
export class County {
    @JsonProperty( 'countyId', Number )
    public countyId: number;
    @JsonProperty( 'countyName', String )
    public countyName: string;
    @JsonProperty( 'countyPopulation', Number )
    public countyPopulation: number;
    @JsonProperty( 'hunterPopulation', Number )
    public hunterPopulation: number;
    @JsonProperty( 'mapDots', String )
    public mapDots: string;
    @JsonProperty( 'stateId', String )
    public stateId: number;
    @JsonProperty( 'countryId', String )
    public countryId: number;
    @JsonProperty( 'countyCode', String )
    public countyCode: number;
    @JsonProperty( 'cretDate', String )
    public cretDate: string;
    @JsonProperty( 'createdBy', String )
    public createdBy: string;
    @JsonProperty( 'lastUpdate', String )
    public lastUpdate: string;
    @JsonProperty( 'lastUpdatedBy', String )
    public lastUpdatedBy: string;
}

@JsonObject
export class Constituency {
    @JsonProperty( 'cnsttncyId', Number )
    public cnsttncyId: number;
    @JsonProperty( 'cnsttncyName', String )
    public cnsttncyName: string;
    @JsonProperty( 'cnsttncyPopulation', Number )
    public cnsttncyPopulation: number;
    @JsonProperty( 'hunterPopulation', Number )
    public hunterPopulation: number;
    @JsonProperty( 'cnsttncyCity', String )
    public cnsttncyCity: string;
    @JsonProperty( 'constituencyCode', String )
    public constituencyCode: string;
    @JsonProperty( 'countyId', Number )
    public countyId: number;
    @JsonProperty( 'mapDots', String )
    public mapDots: string;
    @JsonProperty( 'cretDate', String )
    public cretDate: string;
    @JsonProperty( 'createdBy', String )
    public createdBy: string;
    @JsonProperty( 'lastUpdate', String )
    public lastUpdate: string;
    @JsonProperty( 'lastUpdatedBy', String )
    public lastUpdatedBy: string;
}

@JsonObject
export class ConstituencyWard {
    @JsonProperty( 'wardId', Number )
    public wardId: number;
    @JsonProperty( 'wardName', String )
    public wardName: string;
    @JsonProperty( 'wardPopulation', Number )
    public wardPopulation: number;
    @JsonProperty( 'hunterPopulation', Number )
    public hunterPopulation: number;
    @JsonProperty( 'mapDots', String )
    public mapDots: string;
    @JsonProperty( 'constituencyWardCode', String )
    public constituencyWardCode: string;
    @JsonProperty( 'constituencyId', Number )
    public constituencyId: number;
    @JsonProperty( 'cretDate', String )
    public cretDate: string;
    @JsonProperty( 'createdBy', String )
    public createdBy: string;
    @JsonProperty( 'lastUpdate', String )
    public lastUpdate: string;
    @JsonProperty( 'lastUpdatedBy', String )
    public lastUpdatedBy: string;
}


