import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BancoTaxasPageRoutingModule } from './banco-taxas-routing.module';

import { BancoTaxasPage } from './banco-taxas.page';

// Mascara para campos padrão PT-BR
import { BrMaskerModule } from 'br-mask';
// Importa o component para FormModal
import { BancoTaxasFormComponent } from 'src/app/component/banco-taxas-form/banco-taxas-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BancoTaxasPageRoutingModule,
    // Mascara para campos padrão PT-BR
    BrMaskerModule
  ],
  declarations: [BancoTaxasPage, BancoTaxasFormComponent],
  entryComponents: [BancoTaxasFormComponent]
})
export class BancoTaxasPageModule {}
