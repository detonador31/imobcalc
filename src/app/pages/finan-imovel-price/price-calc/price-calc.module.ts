import { FinanDetalhePriceModalComponent } from './../../../component/finan-detalhe-price-modal/finan-detalhe-price-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PriceCalcPageRoutingModule } from './price-calc-routing.module';

import { PriceCalcPage } from './price-calc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PriceCalcPageRoutingModule
  ],
  declarations: [PriceCalcPage, FinanDetalhePriceModalComponent],
  entryComponents: [FinanDetalhePriceModalComponent]
})
export class PriceCalcPageModule {}
