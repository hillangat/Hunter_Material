
export class WorkflowStep {

    groupid: number;
    stepId: number;
    stepCode: string;
    stepType: string;
    stepName: string;
    parentId: number;
    drools: string;
    committeeFlag: boolean;
    adhocs: WorkflowStep[]

}
