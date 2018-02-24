/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReceiverRegionService } from './receiver-region.service';

describe('Service: ReceiverRegion', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReceiverRegionService]
    });
  });

  it('should ...', inject([ReceiverRegionService], (service: ReceiverRegionService) => {
    expect(service).toBeTruthy();
  }));
});
