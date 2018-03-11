import { ReceiverRegionService } from './../../receiver-regions/services/receiver-region.service';
import { HunterUtil } from 'app/shared/utils/hunter-util';
import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class RegionHierarchy {
    @JsonProperty( 'id', Number, true )
    public id: number = undefined;
    @JsonProperty( 'beanId', Number, true )
    public beanId: number = undefined;
    @JsonProperty( 'name', String, true )
    public name: string = undefined;
    @JsonProperty( 'parent', Number, true )
    public parent: number = undefined;
    @JsonProperty( 'genParent', Number, true )
    public genParent: number = undefined;
    @JsonProperty( 'population', Number, true )
    public population: number = undefined;
    @JsonProperty( 'hunterPopuplation', Number, true )
    public hunterPopuplation: number;
    @JsonProperty( 'mapDots', String, true )
    public mapDots: string = undefined;
    @JsonProperty( 'levelType', String, true )
    public levelType: string = undefined;
    @JsonProperty( 'regionCode', String, true )
    public regionCode: string = undefined;
    @JsonProperty( 'city', String, true )
    public city: string = undefined;
    @JsonProperty( 'hasState', String, true )
    public hasState: boolean = undefined;
    @JsonProperty( 'cretDate', Number, true )
    private _cretDate: number = undefined;
    @JsonProperty( 'lastUpdate', Number, true )
    private _lastUpdate: number = undefined;
    @JsonProperty( 'lastUpdatedBy', String, true )
    public lastUpdatedBy: string = undefined;

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
    public expanded = false;
    public children: RegionHierarchy[];
}
