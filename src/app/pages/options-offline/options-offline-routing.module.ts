import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OptionsOfflinePage } from './options-offline.page';

const routes: Routes = [
  {
    path: '',
    component: OptionsOfflinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OptionsOfflinePageRoutingModule {}
