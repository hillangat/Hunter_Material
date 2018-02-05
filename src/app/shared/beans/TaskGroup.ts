import { JsonObject } from 'json2typescript';

@JsonObject
export class TaskGroup {
    public groupId: number;
    public ownerUserName: string;
    public firstName: string;
    public lastName: string;
    public groupName: string;
    public groupDesc: string;
    public receiverCount: string;
    public receiverType: string;
    public cretDate: string;
    public createdBy: string;
    public lastUpdate: string;
    public lastUpdatedBy: string;
}
