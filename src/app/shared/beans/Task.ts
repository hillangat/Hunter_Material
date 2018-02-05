import { ReceiverRegion } from './ReceiverRegion';
import { TaskGroup } from './task-group';
import { TaskMessage } from './TaskMessage';
import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class Task {
    @JsonProperty( 'taskId', Number )
    public taskId: number;
    @JsonProperty( 'clientId', Number )
    public clientId: number;
    @JsonProperty( 'taskType', String )
    public taskType: string;
    @JsonProperty( 'taskName', String )
    public taskName: string;
    @JsonProperty( 'taskObjective', String )
    public taskObjective: string;
    @JsonProperty( 'description', String )
    public description: string;
    @JsonProperty( 'tskAgrmntLoc', String )
    public tskAgrmntLoc: string;
    @JsonProperty( 'tskMsgType', String )
    public tskMsgType: string;
    @JsonProperty( 'taskBudget', String )
    public taskBudget: number;
    @JsonProperty( 'taskCost', Number )
    public taskCost: number
    @JsonProperty( 'recurrentTask', Boolean )
    public recurrentTask: boolean;
    @JsonProperty( 'taskDateline', Number )
    public taskDateline: number;
    @JsonProperty( 'taskLifeStatus', String )
    public taskLifeStatus: string;
    @JsonProperty( 'taskDeliveryStatus', String )
    public taskDeliveryStatus: string;
    @JsonProperty( 'taskApproved', Boolean )
    public taskApproved: boolean;
    @JsonProperty( 'taskApprover', String )
    public taskApprover: string;
    @JsonProperty( 'gateWayClient', String )
    public gateWayClient: string;
    @JsonProperty( 'desiredReceiverCount', String )
    public desiredReceiverCount: string;
    @JsonProperty( 'availableReceiverCount', String )
    public availableReceiverCount: string;
    @JsonProperty( 'confirmedReceiverCount', String )
    public confirmedReceiverCount: string;
    @JsonProperty( 'srlzdTskPrcssJbObjsFilLoc', String )
    public srlzdTskPrcssJbObjsFilLoc: string;
    @JsonProperty( 'processedBy', String )
    public processedBy: string;
    @JsonProperty( 'processedOn', Number )
    public processedOn: number;
    @JsonProperty( 'cretDate', Number )
    public cretDate: number;
    @JsonProperty( 'lastUpdate', Number )
    public lastUpdate: number;
    @JsonProperty( 'updatedBy', String )
    public updatedBy: string;
    @JsonProperty( 'createdBy', String )
    public createdBy: string;
    @JsonProperty( 'taskMessage', TaskMessage )
    public taskMessage: TaskMessage;
    @JsonProperty( 'taskRegions', ReceiverRegion )
    public taskRegions: ReceiverRegion;
    @JsonProperty( 'taskGroups', [TaskGroup] )
    public taskGroups: TaskGroup[]

    /** Extra details loaded separately */
    public updatedByStr: string;
    public createdByStr: string;
    public processedByStr: string;
}
