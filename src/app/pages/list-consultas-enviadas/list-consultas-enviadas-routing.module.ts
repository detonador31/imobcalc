import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListConsultasEnviadasPage } from './list-consultas-enviadas.page';

const routes: Routes = [
  {
    path: '',
    component: ListConsultasEnviadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListConsultasEnviadasPageRoutingModule {}
