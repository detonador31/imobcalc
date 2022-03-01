import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinanImovelCalcPage } from './finan-imovel-calc.page';

const routes: Routes = [
  {
    path: '',
    component: FinanImovelCalcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinanImovelCalcPageRoutingModule {}
