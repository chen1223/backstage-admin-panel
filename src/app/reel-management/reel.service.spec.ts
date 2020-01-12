import { TestBed } from '@angular/core/testing';

import { ReelService } from './reel.service';

describe('ReelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReelService = TestBed.get(ReelService);
    expect(service).toBeTruthy();
  });
});
