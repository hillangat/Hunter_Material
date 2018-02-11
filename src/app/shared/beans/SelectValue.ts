import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class SelectValue {
    @JsonProperty( 'value', String )
    public value: string;
    @JsonProperty('text', String)
    public text: string;
    constructor( value: string, text: string ) {
        this.value = value;
        this.text = text;
    }
}

