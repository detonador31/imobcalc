import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UfTaxasPage } from './uf-taxas.page';

const routes: Routes = [
  {
    path: '',
    component: UfTaxasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UfTaxasPageRoutingModule {}
