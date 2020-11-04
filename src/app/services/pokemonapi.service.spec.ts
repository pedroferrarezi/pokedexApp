import { TestBed } from '@angular/core/testing';

import { PokemonapiService } from './pokemonapi.service';

describe('PokemonapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PokemonapiService = TestBed.get(PokemonapiService);
    expect(service).toBeTruthy();
  });
});
