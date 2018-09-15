import { Component, OnInit } from '@angular/core';
import { RegionHierarchy } from '../../shared/beans/region-hierarchy';
import { ReceiverRegionService } from '../services/receiver-region.service';

@Component({
  selector: 'app-receive-region-grid',
  templateUrl: './receive-region-grid.component.html',
  styleUrls: ['./receive-region-grid.component.css']
})
export class ReceiveRegionGridComponent implements OnInit {

  public baseHierarchies: RegionHierarchy[] = [];

  constructor( private regionService: ReceiverRegionService ) {  }

  public ngOnInit() {
    this.loadRegions();
  }

  public loadRegions() {
    this.regionService
        .getCountiesForCountry(1, 'Kenya')
        .subscribe( (r: RegionHierarchy[] ) => this.baseHierarchies = r );
  }

  public reloadRegions() {
    this.loadRegions();
  }

}

