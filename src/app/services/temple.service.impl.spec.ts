import { TestBed } from '@angular/core/testing';

import { TempleServiceImpl } from './temple.service.impl';

describe('TempleServiceImpl', () => {
  let service: TempleServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TempleServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getActualTemple', () => {
    it('should return an instance of Temple', () => {
      // When
      const result = service.getTemple();

      // Then
      expect(result).toBeTruthy();
    });
  });
});
