
export interface TaskFieldsModel {
    taskId?: number;
    clientId: number,
    taskType: string;
    taskName: string;
    taskObjective: string;
    description: string;
    tskAgrmntLoc: string;
    tskMsgType: string;
    taskBudget: number;
    taskCost: number;
    recurrentTask: boolean;
    taskDateline: Date | string;
    taskDatelineStr: string;
    taskLifeStatus: string;
    taskDeliveryStatus: string;
    taskApproved: boolean;
    taskApprover: string;
    gateWayClient: number;
    desiredReceiverCount: number;
    availableReceiverCount: number;
    confirmedReceiverCount: number;
    srlzdTskPrcssJbObjsFilLoc: number;
}
