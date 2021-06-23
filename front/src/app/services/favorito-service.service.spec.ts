import { TestBed } from '@angular/core/testing';

import { FavoritoServiceService } from './favorito-service.service';

describe('FavoritoServiceService', () => {
  let service: FavoritoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
