import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PriceCalcPage } from './price-calc.page';

const routes: Routes = [
  {
    path: '',
    component: PriceCalcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PriceCalcPageRoutingModule {}
