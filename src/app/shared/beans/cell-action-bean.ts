import { DynGridProperties } from './../dynamic-grid/shared/dyn-grid-properties';
import { HunterTableConfig } from './hunter-table-configs';

export class CellActionBean {
    public dialogSelButton: 'YES' | 'NO' | undefined;
    public message: string;
    public description: string;
    public title: string;
    public titleIcon: string;
    public yesIconName: string;
    public notIconName: string;
    public yesButtonText: string;
    public noButtonText: string;
    public cellRow: any;
    public entryValues: any;
    public dynGridProps: DynGridProperties;
    public dynGridURL: string;
    public actionHeader: HunterTableConfig
}
