import { TestBed } from '@angular/core/testing';

import { BookDetailsService } from './details.service';

describe('DetailsService', () => {
  let service: BookDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
