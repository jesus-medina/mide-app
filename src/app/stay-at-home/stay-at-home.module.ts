import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StayAtHomePageRoutingModule } from './stay-at-home-routing.module';

import { StayAtHomePage } from './stay-at-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StayAtHomePageRoutingModule
  ],
  declarations: [StayAtHomePage]
})
export class StayAtHomePageModule {}
