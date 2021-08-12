import { TestBed } from '@angular/core/testing';

import { HttpsHelperService } from './https-helper.service';

describe('HttpsHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpsHelperService = TestBed.get(HttpsHelperService);
    expect(service).toBeTruthy();
  });
});
