import { TestBed } from '@angular/core/testing';

import { MusicdbService } from './musicdb.service';

describe('MusicdbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MusicdbService = TestBed.get(MusicdbService);
    expect(service).toBeTruthy();
  });
});
