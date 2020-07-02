import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StayAtHomePage } from './stay-at-home.page';

const routes: Routes = [
  {
    path: '',
    component: StayAtHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StayAtHomePageRoutingModule {}
