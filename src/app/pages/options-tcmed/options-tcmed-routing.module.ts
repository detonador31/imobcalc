import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OptionsTcmedPage } from './options-tcmed.page';

const routes: Routes = [
  {
    path: '',
    component: OptionsTcmedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OptionsTcmedPageRoutingModule {}
