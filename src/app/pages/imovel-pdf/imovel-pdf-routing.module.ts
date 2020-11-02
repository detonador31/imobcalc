import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImovelPdfPage } from './imovel-pdf.page';

const routes: Routes = [
  {
    path: '',
    component: ImovelPdfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImovelPdfPageRoutingModule {}
