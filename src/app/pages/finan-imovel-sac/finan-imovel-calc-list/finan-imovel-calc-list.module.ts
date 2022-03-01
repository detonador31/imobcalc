import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinanImovelCalcListPageRoutingModule } from './finan-imovel-calc-list-routing.module';

import { FinanImovelCalcListPage } from './finan-imovel-calc-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinanImovelCalcListPageRoutingModule
  ],
  declarations: [FinanImovelCalcListPage]
})
export class FinanImovelCalcListPageModule {}
