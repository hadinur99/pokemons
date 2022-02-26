import { TestBed } from '@angular/core/testing';

import { PokemonImplService } from './pokemon-impl.service';

describe('PokemonImplService', () => {
  let service: PokemonImplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonImplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
