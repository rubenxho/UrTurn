import { TestBed } from '@angular/core/testing';

import { ClienteOpinionesResenarService } from './cliente-opiniones-resenar.service';

describe('ClienteOpinionesResenarService', () => {
  let service: ClienteOpinionesResenarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteOpinionesResenarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
