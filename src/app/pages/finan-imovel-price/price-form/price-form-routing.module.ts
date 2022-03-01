import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PriceFormPage } from './price-form.page';

const routes: Routes = [
  {
    path: '',
    component: PriceFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PriceFormPageRoutingModule {}
