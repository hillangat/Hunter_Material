import { JsonObject, JsonProperty } from 'json2typescript/src/json2typescript/json-convert-decorators';
import { DynGridDataReq } from '../../beans/dyn-grid-data-req';

@JsonObject
export class DynGridProperties {

    @JsonProperty( 'gridDataLoadUrl', String )
    private _gridDataLoadUrl: string;
    @JsonProperty( 'rowIdField', String )
    private _rowIdField: string;
    @JsonProperty( 'sortable', Boolean )
    private _sortable = false;
    @JsonProperty( 'selectable', Boolean )
    private _selectable = false;
    @JsonProperty( 'selectType', String )
    private _selectType: 'checkbox' |  'radio' | 'row';
    @JsonProperty( 'filterable', Boolean )
    private _filterable = false;
    @JsonProperty( 'pageable', Boolean )
    private _pageable = true;
    @JsonProperty( 'pageSize', Number )
    private _pageSize = 5;
    @JsonProperty( 'pageNo', Number )
    private _pageNo = 1;
    @JsonProperty( 'pageSizes', [Number] )
    private _pageSizes = [5, 10, 20, 50];
    @JsonProperty( 'refreshable', Boolean )
    private _refreshable = true;
    @JsonProperty( 'addable', Boolean )
    private _addable = true;
    @JsonProperty( 'maxHeight', Number )
    private _maxHeight = 400;
    @JsonProperty( 'addLabel', String )
    private _addLabel = 'Add New Record';
    @JsonProperty( 'defaDynGridDataReq', DynGridDataReq )
    private _defaDynGridDataReq: DynGridDataReq;

    public get gridDataLoadUrl(): string { return this._gridDataLoadUrl; }
    public set gridDataLoadUrl( value: string ) { this._gridDataLoadUrl = value; }

    public get rowIdField(): string { return this._rowIdField; }
    public set rowIdField( value: string ) { this._rowIdField = value; }

    public get selectType(): 'checkbox' |  'radio' | 'row' { return this._selectType; }
    public set selectType( value: 'checkbox' |  'radio' | 'row' ) { this._selectType = value; }

    public get selectable(): boolean { return this._selectable; }
    public set selectable( value: boolean ) { this._selectable = value; }

    public get sortable(): boolean { return this._sortable; }
    public set sortable( value: boolean ) { this._sortable = value; }

    public get filterable(): boolean { return this._filterable; }
    public set filterable( value: boolean ) { this._filterable = value; }

    public get pageable(): boolean { return this._pageable; }
    public set pageable( value: boolean ) { this._pageable = value; }

    public get pageSize(): number { return this._pageSize; }
    public set pageSize( value: number ) { this._pageSize = value; }

    public get pageNo(): number { return this._pageNo; }
    public set pageNo( value: number ) { this._pageNo = value; }

    public get pageSizes(): number[] { return this._pageSizes; }
    public set pageSizes( value: number[] ) { this._pageSizes = value; }

    public get refreshable(): boolean { return this._refreshable; }
    public set refreshable( value: boolean ) { this._refreshable = value; }

    public get addable(): boolean { return this._addable; }
    public set addable( value: boolean ) { this._addable = value; }

    public get maxHeight(): number { return this._maxHeight; }
    public set maxHeight( value: number ) { this._maxHeight = value; }

    public get defaDynGridDataReq(): DynGridDataReq { return this._defaDynGridDataReq; }
    public set defaDynGridDataReq( value: DynGridDataReq ) { this._defaDynGridDataReq = value; }

}
