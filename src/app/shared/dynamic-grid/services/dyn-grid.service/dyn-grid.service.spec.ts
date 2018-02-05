import { TestBed, inject } from '@angular/core/testing';

import { DynGridService } from './dyn-grid.service';

describe('DynGrid.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynGridService]
    });
  });

  it('should be created', inject([DynGridService], (service: DynGridService) => {
    expect(service).toBeTruthy();
  }));
});

