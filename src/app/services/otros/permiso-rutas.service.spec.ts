import { TestBed } from '@angular/core/testing';

import { PermisoRutasService } from './permiso-rutas.service';

describe('PermisoRutasService', () => {
  let service: PermisoRutasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermisoRutasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
