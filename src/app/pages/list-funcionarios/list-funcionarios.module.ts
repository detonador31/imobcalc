import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListFuncionariosPageRoutingModule } from './list-funcionarios-routing.module';

import { ListFuncionariosPage } from './list-funcionarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListFuncionariosPageRoutingModule
  ],
  declarations: [ListFuncionariosPage]
})
export class ListFuncionariosPageModule {}
