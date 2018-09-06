import { TestBed, inject } from '@angular/core/testing';

import { IdService } from './id.service';

describe('IdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IdService]
    });
  });

  it('should be created', inject([IdService], (service: IdService) => {
    expect(service).toBeTruthy();
  }));
});
