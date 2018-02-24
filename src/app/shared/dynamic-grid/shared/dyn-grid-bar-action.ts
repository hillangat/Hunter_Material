import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class DynGridBarAction {

    @JsonProperty( 'text', String )
    private _text: string;
    @JsonProperty( 'text', String )
    private _key: string;
    @JsonProperty( 'text', String )
    private _index: number;
    @JsonProperty( 'text', String )
    private _displayType: string;
    @JsonProperty( 'icon', String )
    private _icon: string;

    public get text(): string { return this._text }
    public set text( value: string ) { this._text = value }

    public get key(): string { return this._key }
    public set key( value: string ) { this._key = value }

    public get index(): number { return this._index }
    public set index( value: number ) { this._index = value }

    public get displayType(): string { return this._displayType }
    public set displayType( value: string ) { this._displayType = value }

    public get icon(): string { return this._icon }
    public set icon( value: string ) { this._icon = value }

}
