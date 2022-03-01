import { BrMaskerModule } from 'br-mask';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PriceFormPageRoutingModule } from './price-form-routing.module';

import { PriceFormPage } from './price-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PriceFormPageRoutingModule,
    // Mascara para campos padrão PT-BR
    BrMaskerModule    
  ],
  declarations: [PriceFormPage]
})
export class PriceFormPageModule {}
