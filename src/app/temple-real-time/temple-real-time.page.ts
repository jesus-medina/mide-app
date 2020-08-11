import { Component, OnInit } from '@angular/core';
import { TempleService } from '../services/temple.service';

@Component({
  selector: 'app-temple-real-time',
  templateUrl: './temple-real-time.page.html',
  styleUrls: ['./temple-real-time.page.scss'],
})
export class TempleRealTimePage {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(
    public templeService: TempleService,
    ) {
    templeService.fetchTempleByName('41-va-iafcj');
  }

}
