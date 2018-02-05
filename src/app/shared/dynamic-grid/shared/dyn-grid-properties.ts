import { JsonObject, JsonProperty } from 'json2typescript/src/json2typescript/json-convert-decorators';
import { DynGridDataReq } from '../../beans/dyn-grid-data-req';

@JsonObject
export class DynGridProperties {

    @JsonProperty( 'gridDataLoadUrl', String )
    private _gridDataLoadUrl: string;
    @JsonProperty( 'sortable', Boolean )
    private _sortable = false;
    @JsonProperty( 'filterable', Boolean )
    private _filterable = false;
    @JsonProperty( 'pageable', Boolean )
    private _pageable = true;
    @JsonProperty( 'pageSize', Number )
    private _pageSize = 5;
    @JsonProperty( 'pageNumber', Number )
    private _pageNumber = 3;
    @JsonProperty( 'refreshable', Boolean )
    private _refreshable = true;
    @JsonProperty( 'addable', Boolean )
    private _addable = true;
    @JsonProperty( 'addLabel', String )
    private _addLabel = 'Add New Record';
    @JsonProperty( 'defaDynGridDataReq', DynGridDataReq )
    private _defaDynGridDataReq: DynGridDataReq;

    public get gridDataLoadUrl(): string { return this._gridDataLoadUrl; }
    public set gridDataLoadUrl( value: string ) { this._gridDataLoadUrl = value; }

    public get sortable(): boolean { return this._sortable; }
    public set sortable( value: boolean ) { this._sortable = value; }

    public get filterable(): boolean { return this._filterable; }
    public set filterable( value: boolean ) { this._filterable = value; }

    public get pageable(): boolean { return this._pageable; }
    public set pageable( value: boolean ) { this._pageable = value; }

    public get pageSize(): number { return this._pageSize; }
    public set pageSize( value: number ) { this._pageSize = value; }

    public get pageNumber(): number { return this._pageNumber; }
    public set pageNumber( value: number ) { this._pageNumber = value; }

    public get refreshable(): boolean { return this._refreshable; }
    public set refreshable( value: boolean ) { this._refreshable = value; }

    public get addable(): boolean { return this._addable; }
    public set addable( value: boolean ) { this._addable = value; }

    public get defaDynGridDataReq(): DynGridDataReq { return this._defaDynGridDataReq; }
    public set defaDynGridDataReq( value: DynGridDataReq ) { this._defaDynGridDataReq = value; }

}
