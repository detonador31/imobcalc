import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormConsultaPage } from './form-consulta.page';

const routes: Routes = [
  {
    path: '',
    component: FormConsultaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormConsultaPageRoutingModule {}
