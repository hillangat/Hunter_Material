import { HunterUtil } from './../shared/utils/hunter-util';
import { ReceiverRegionService } from './services/receiver-region.service';
import { RegionHierarchy } from './../shared/beans/region-hierarchy';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-receiver-regions',
    templateUrl: 'receiver-regions.component.html',
    styleUrls: ['receiver-regions.component.scss']
})
export class ReceiverRegionsComponent implements OnInit {

    public baseHierarchies: RegionHierarchy[] = [];

    constructor( private regionService: ReceiverRegionService ) {  }

    public ngOnInit() {
      this.regionService
          .getWardsForConstituency('Kenya', 7)
          .subscribe( (rs: RegionHierarchy[] ) => this.baseHierarchies = rs );
    }

    public formatDate( date: number ): string {
        return HunterUtil.getFormatedDate( new Date( date ) );
    }

}
