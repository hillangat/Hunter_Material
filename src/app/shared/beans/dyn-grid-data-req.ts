import { GridFieldUserInput } from './../dynamic-grid/shared/grid-field-user-input';
import { JsonProperty, JsonObject } from 'json2typescript';

@JsonObject
export class DynGridDataReq {
    @JsonProperty( 'filterBy', [GridFieldUserInput] )
    public filterBy: GridFieldUserInput[];
    @JsonProperty( 'orderBy', [GridFieldUserInput] )
    public orderBy: GridFieldUserInput[];
    @JsonProperty( 'pageNo', Number )
    public pageNo: number;
    @JsonProperty( 'pageSize', Number )
    public pageSize: number;
    @JsonProperty( 'reference', String )
    public reference: string;
}

