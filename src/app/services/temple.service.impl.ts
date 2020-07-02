import { Injectable } from '@angular/core';
import { Temple } from 'src/app/domain/temple.model';
import { TempleService } from './temple.service';

@Injectable({
  providedIn: 'root'
})
export class TempleServiceImpl implements TempleService {

  constructor() { }

  getTemple(): Temple {
    return {
      name: '41va IAFCJ',
      reunions: [
        {
          startDate: '10:00 p.m.',
          endDate: '11:00 p.m.',
          capacity: 50,
          occupied: 0
        },
        {
          startDate: '12:00 p.m.',
          endDate: '13:00 p.m.',
          capacity: 50,
          occupied: 0
        },
        {
          startDate: '14:00 p.m.',
          endDate: '15:00 p.m.',
          capacity: 50,
          occupied: 0
        },
      ]
    };
  }
}
