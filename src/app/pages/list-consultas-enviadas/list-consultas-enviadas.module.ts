import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListConsultasEnviadasPageRoutingModule } from './list-consultas-enviadas-routing.module';

import { ListConsultasEnviadasPage } from './list-consultas-enviadas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListConsultasEnviadasPageRoutingModule
  ],
  declarations: [ListConsultasEnviadasPage]
})
export class ListConsultasEnviadasPageModule {}
