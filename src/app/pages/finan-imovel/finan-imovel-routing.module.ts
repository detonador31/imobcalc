import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinanImovelPage } from './finan-imovel.page';

const routes: Routes = [
  {
    path: '',
    component: FinanImovelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinanImovelPageRoutingModule {}
