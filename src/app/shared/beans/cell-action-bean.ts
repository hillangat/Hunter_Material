import { HunterTableConfig } from './hunter-table-configs';

export class CellActionBean {
    public dialogSelButton: 'YES' | 'NO' | undefined;
    public message: string;
    public description: string;
    public title: string;
    public titleIcon: string;
    public yesIconName: string;
    public notIconName: string;
    public yetButtonText: string;
    public noButtonText: string;
    public cellRow: any;
    public actionHeader: HunterTableConfig
}
