import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UfTaxasPageRoutingModule } from './uf-taxas-routing.module';

import { UfTaxasPage } from './uf-taxas.page';

// Mascara para campos padrão PT-BR
import { BrMaskerModule } from 'br-mask';
// Importa o component para FormModal
import { UfTaxasFormComponent } from 'src/app/component/uf-taxas-form/uf-taxas-form.component'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UfTaxasPageRoutingModule,
    // Mascara para campos padrão PT-BR
    BrMaskerModule
  ],
  declarations: [UfTaxasPage, UfTaxasFormComponent],
  entryComponents: [UfTaxasFormComponent]
})
export class UfTaxasPageModule {}
