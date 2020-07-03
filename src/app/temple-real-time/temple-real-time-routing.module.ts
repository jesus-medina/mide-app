import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TempleRealTimePage } from './temple-real-time.page';

const routes: Routes = [
  {
    path: '',
    component: TempleRealTimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TempleRealTimePageRoutingModule {}
