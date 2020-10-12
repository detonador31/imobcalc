import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListConsultasEnviarPage } from './list-consultas-enviar.page';

const routes: Routes = [
  {
    path: '',
    component: ListConsultasEnviarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListConsultasEnviarPageRoutingModule {}
