import { TestBed } from '@angular/core/testing';

import { ListTrucksService } from './truck.service';

describe('ListTrucksService', () => {
  let service: ListTrucksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListTrucksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
