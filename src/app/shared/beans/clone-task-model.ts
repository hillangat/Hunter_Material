import { JsonObject, JsonProperty } from 'json2typescript';


@JsonObject
export class TaskCloneModel {
    @JsonProperty( 'taskId', Number )
    public taskId: number;
    @JsonProperty( 'newOwner', Number )
    public newOwner: string;
    @JsonProperty( 'taskDescription', String )
    public taskDescription: string;
    @JsonProperty( 'taskName', String)
    public taskName: string;
}
