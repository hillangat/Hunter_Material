import { MatTableDataSource } from '@angular/material';

export class DynGridConfig {

    public dataSource: MatTableDataSource<Element>;
    public pageSize: number;
    public pageSizeOptions: number[];

}
