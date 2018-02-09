import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject
export class HunterTableConfig {
    @JsonProperty('index', Number)
    public index: number;
    @JsonProperty('headerId', String)
    public headerId: string;
    @JsonProperty('dataId', String)
    public dataId: string;
    @JsonProperty('displayName', String)
    public displayName: string;
    @JsonProperty('sortable', Boolean)
    public sortable: boolean;
    @JsonProperty('show', Boolean)
    public show: boolean;
    @JsonProperty('checkBox', Boolean)
    public checkBox: boolean;
    @JsonProperty('actionCellType', String)
    public actionCellType: string;
    @JsonProperty('bootstrapIconName', String)
    public bootstrapIconName: string;
    @JsonProperty('dataType', String)
    public dataType: string;
    @JsonProperty('currentOrder', Boolean)
    public currentOrder: boolean;
    @JsonProperty('actionCol', Boolean)
    public actionCol: boolean;
    @JsonProperty('actionColIconName', String)
    public actionColIconName: string;
    @JsonProperty('width', String)
    public width: string;
}
