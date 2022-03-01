import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinanImovelCalcPageRoutingModule } from './finan-imovel-calc-routing.module';

import { FinanImovelCalcPage } from './finan-imovel-calc.page';
import { FinanDetalheModalComponent } from './../../../component/finan-detalhe-modal/finan-detalhe-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinanImovelCalcPageRoutingModule
  ],
  declarations: [FinanImovelCalcPage, FinanDetalheModalComponent],
  entryComponents: [FinanDetalheModalComponent]
})
export class FinanImovelCalcPageModule {}
