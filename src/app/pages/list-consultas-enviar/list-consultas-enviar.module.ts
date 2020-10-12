import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListConsultasEnviarPageRoutingModule } from './list-consultas-enviar-routing.module';

import { ListConsultasEnviarPage } from './list-consultas-enviar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListConsultasEnviarPageRoutingModule
  ],
  declarations: [ListConsultasEnviarPage]
})
export class ListConsultasEnviarPageModule {}
