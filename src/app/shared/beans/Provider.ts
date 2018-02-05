import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class Provider {
    @JsonProperty( 'providerId', Number )
    public providerId: number;
    @JsonProperty( 'providerName', String )
    public providerName: string;
    @JsonProperty( 'cstPrAudMsg', Number )
    public cstPrAudMsg: number;
    @JsonProperty( 'cstPrTxtMsg', Number )
    public cstPrTxtMsg: number;
}
