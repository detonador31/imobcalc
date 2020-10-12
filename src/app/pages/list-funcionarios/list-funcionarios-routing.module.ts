import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListFuncionariosPage } from './list-funcionarios.page';

const routes: Routes = [
  {
    path: '',
    component: ListFuncionariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListFuncionariosPageRoutingModule {}
