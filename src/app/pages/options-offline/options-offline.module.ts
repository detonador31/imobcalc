import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OptionsOfflinePageRoutingModule } from './options-offline-routing.module';

import { OptionsOfflinePage } from './options-offline.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OptionsOfflinePageRoutingModule
  ],
  declarations: [OptionsOfflinePage]
})
export class OptionsOfflinePageModule {}
