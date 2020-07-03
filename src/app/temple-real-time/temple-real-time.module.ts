import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TempleRealTimePageRoutingModule } from './temple-real-time-routing.module';

import { TempleRealTimePage } from './temple-real-time.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TempleRealTimePageRoutingModule
  ],
  declarations: [TempleRealTimePage]
})
export class TempleRealTimePageModule {}
