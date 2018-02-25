import { HunterUtil } from 'app/shared/utils/hunter-util';
import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class RegionHierarchy {
    @JsonProperty( 'id', Number, true )
    public id: number = undefined;
    @JsonProperty( 'id', Number, true )
    public beanId: number = undefined;
    @JsonProperty( 'id', String, true )
    public name: string = undefined;
    @JsonProperty( 'id', Number, true )
    public parent: number = undefined;
    @JsonProperty( 'id', Number, true )
    public genParent: number = undefined;
    @JsonProperty( 'id', Number, true )
    public population: number = undefined;
    @JsonProperty( 'id', Number, true )
    public hunterPopuplation: number;
    @JsonProperty( 'id', String, true )
    public mapDots: string = undefined;
    @JsonProperty( 'id', String, true )
    public levelType: string = undefined;
    @JsonProperty( 'id', String, true )
    public regionCode: string = undefined;
    @JsonProperty( 'id', String, true )
    public city: string = undefined;
    @JsonProperty( 'id', String, true )
    public hasState: boolean = undefined;
    @JsonProperty( 'id', Number, true )
    private _cretDate: number = undefined;
    @JsonProperty( 'id', Number, true )
    private _lastUpdate: number = undefined;
    @JsonProperty( 'id', String, true )
    public lastUpdatedBy: string = undefined;
    @JsonProperty( 'id', String, true )

    public set cretDate( value: number ) {
        this._cretDate = value;
        const date: Date = this._cretDate ? new Date( this._cretDate ) : undefined;
        this.cretDateStr = date ? HunterUtil.getFormatedDate( date ) : undefined;
    }
    public get cretDate(): number {
        return this._cretDate;
    }
    public set lastUpdate( value: number ) {
        this._lastUpdate = value;
        const date: Date = this._lastUpdate ? new Date( this._lastUpdate ) : undefined;
        this.lastUpdateStr = date ? HunterUtil.getFormatedDate( date ) : undefined;
    }
    public get lastUpdate(): number {
        return this._lastUpdate;
    }

    public cretDateStr: string = undefined;
    public lastUpdateStr: string = undefined;


}
