import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinanImovelCalcListPage } from './finan-imovel-calc-list.page';

const routes: Routes = [
  {
    path: '',
    component: FinanImovelCalcListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinanImovelCalcListPageRoutingModule {}
