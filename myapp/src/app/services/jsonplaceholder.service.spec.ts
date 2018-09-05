import { TestBed, inject } from '@angular/core/testing';

import { JsonplaceholderService } from './jsonplaceholder.service';

describe('JsonplaceholderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsonplaceholderService]
    });
  });

  it('should be created', inject([JsonplaceholderService], (service: JsonplaceholderService) => {
    expect(service).toBeTruthy();
  }));
});
