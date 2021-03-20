import { TestBed } from '@angular/core/testing';

import { DigiService } from './digi.service';

describe('DigiService', () => {
  let service: DigiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DigiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
